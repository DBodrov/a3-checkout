import React from 'react';
import {TField} from '@/context/CheckoutProvider/types';
import {isEmptyString} from '@/utils/string.utils';

type TFormState = {
  values: Record<string, unknown>;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
};

export type TChangesType = 'ADD_ERROR' | 'CHANGE_VALUE';

export interface IFormChanges {
  type: TChangesType;
  fieldName: string;
  payload: any;
}

const getInitFormState = (template?: TField[]): TFormState => {
  if (!template) {
    return {
      errors: {},
      touched: {},
      values: {},
    };
  }
  return template?.reduce(
    (state, field) => {
      const initState = {
        ...state,
        values: {
          ...state.values,
          [field.name]: field.value || field.default,
        },
        errors: {
          ...state.errors,
          [field.name]: field.alert?.text || '',
        },
        touched: {
          ...state.touched,
          [field.name]: Boolean(field.alert?.text),
        },
      };
      return initState;
    },
    {values: {}, errors: {}, touched: {}},
  );
};

const formStateReducer = (state: TFormState, changes: IFormChanges) => {
  switch (changes.type) {
    case 'ADD_ERROR': {
      return {
        ...state,
        errors: {
          ...state.errors,
          [changes.fieldName]: changes.payload,
        },
        touched: {
          ...state.touched,
          [changes.fieldName]: true,
        },
      };
    }
    case 'CHANGE_VALUE': {
      return {
        ...state,
        values: {
          ...state.values,
          [changes.fieldName]: changes.payload,
        },
        touched: {
          ...state.touched,
          [changes.fieldName]: true,
        },
        errors: {
          ...state.errors,
          [changes.fieldName]: '',
        },
      };
    }
    default:
      return state;
  }
};

const clearErrorAction = (fieldName: string): IFormChanges => ({
  type: 'ADD_ERROR',
  fieldName,
  payload: '',
});


export function useCheckoutForm(template?: TField[]) {
  const [{errors, touched, values}, dispatch] = React.useReducer(formStateReducer, getInitFormState(template));

  const calcAmount = React.useMemo(() => {
    const sumFields = template?.filter(f => f.type === 'SUM').map(f => f.name);

    if (sumFields) {
      const amount = sumFields.reduce((amount ,f) => amount + (isFinite(Number(values[f])) ? Number(values[f]) : 0), 0);
      return isFinite(amount) ? Number(amount.toFixed(2)) : 0;
    }
    return 0;
  }, [template, values])

  const handleValidate = React.useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      const field = e.target;
      const fieldData = template?.find(field => field.name === e.target.name);
      if (field.validity.valid) {
        dispatch(clearErrorAction(field.name));
        return;
      }
      if (field.validity.valueMissing) {
        dispatch({type: 'ADD_ERROR', fieldName: field.name, payload: 'Обязательное поле'});
        return;
      }
      if (field.validity.patternMismatch) {
        const errorMessage = fieldData?.validation?.message || 'Ошибка валидации';
        dispatch({type: 'ADD_ERROR', fieldName: field.name, payload: errorMessage});
        return;
      }
    },
    [template],
  );

  const handleValidateAllFields = (e: React.FormEvent<HTMLFormElement>) => {
    const fields = Array.from(e.currentTarget.elements).filter((f) => Boolean((f as HTMLInputElement).name));
    const isValid = (fields as HTMLInputElement[]).every((field) => field.validity.valid);
    return isValid;
  };

  const formNeedValidation = template?.some(field => field.editable && Boolean(field.validation));
  const formIsValid = React.useCallback(() => {
    if (!formNeedValidation) {
      return true;
    }
    const isAllTouched = Object.values(touched).every(Boolean);
    const noErrors = Object.values(errors).every(isEmptyString);
    return isAllTouched && noErrors;
  }, [errors, formNeedValidation, touched]);

  const hasError = (fieldName: string) => {
    const isTouched = touched[fieldName] === true;
    return isTouched && Boolean(errors[fieldName]);
  };

  return {
    handleValidate,
    handleValidateAllFields,
    formIsValid,
    hasError,
    dispatch,
    values,
    errors,
    touched,
    amount: calcAmount
  };
}
