import React from 'react';
import {Button, Input, Span} from '@a3/frontkit';
import {useCheckout} from '@/context';
import {TField} from '@/context/CheckoutProvider/types';
import {createPaymentLink, TPaymentLinkParams} from '@/api/Payment.api';
import {toCurrency} from '@/utils/string.utils';
import {PaymentTypeRadio} from './PaymentTypeRadio';
import {useCheckoutForm} from './use-checkout-form';
import {Form, Label} from './styles';

export function CheckoutForm() {
  const {template, updateStep, step, nextStep, transactionId} = useCheckout();
  const {handleValidate, handleValidateAllFields, dispatch, hasError, values, errors, amount} =
    useCheckoutForm(template);

  const handleUpdateStep = (e: React.FormEvent<HTMLFormElement>) => {
    const formIsValid = handleValidateAllFields(e);
    e.preventDefault();
    if (!formIsValid) {
      return;
    }

    const account = new FormData(e.currentTarget);
    if (nextStep === 999) {
      const paymentParams: TPaymentLinkParams = {
        amount,
        transactionId,
        description: template?.find(f => f.extType === 'CLIENT')?.value,
      };
      createPaymentLink(paymentParams);
      return;
    }

    updateStep(account);
  };

  const handleChangePaymentType = (field: string, paymentType: string) => {
    dispatch({type: 'CHANGE_VALUE', fieldName: field, payload: paymentType});
  };

  const handleChangeSum = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    dispatch({type: 'CHANGE_VALUE', fieldName: e.currentTarget.name, payload: value});
  };

  const renderField = (field: TField) => {
    switch (field.type) {
      case 'INPUT':
      default:
        return (
          <Label htmlFor={field.name} key={field.name}>
            {field.description}
            <Input
              name={field.name}
              readOnly={!field.editable}
              title={field.hint?.text || field.example}
              id={field.name}
              defaultValue={field.value}
              css={{borderColor: hasError(field.name) ? 'var(--color-error) !important' : 'var(--color-border)'}}
              pattern={field.validation?.expression}
              required={field.mandatory}
              onBlur={handleValidate}
            />
            {hasError(field.name) ? (
              <span css={{fontSize: '0.8rem', color: 'var(--color-error)'}} role="alert">
                {errors[field.name]}
              </span>
            ) : null}
          </Label>
        );
      case 'TEXTAREA': {
        return (
          <article css={{height: '4rem', padding: '1rem 0'}} key={field.name}>
            <Span css={{lineHeight: 1}}>{field.value}</Span>
          </article>
        );
      }
      case 'RADIO': {
        return (
          <article key={field.name}>
            <PaymentTypeRadio
              field={field}
              onChange={handleChangePaymentType}
              checkedField={values[field.name] as string}
            />
          </article>
        );
      }
      case 'SUM': {
        return (
          <Label htmlFor={field.name} key={field.name}>
            {`${field.description.replace(':', ', руб.')}`}
            <Input
              name={field.name}
              readOnly={!field.editable}
              title={field.hint?.text || field.example}
              id={field.name}
              autoComplete="off"
              inputMode="numeric"
              pattern={field.validation?.expression}
              required={field.mandatory}
              css={{borderColor: hasError(field.name) ? 'var(--color-error) !important' : 'var(--color-border)'}}
              onBlur={handleValidate}
              onChange={handleChangeSum}
              value={values[field.name] as string}
            />
            {hasError(field.name) ? (
              <span css={{fontSize: '0.8rem', color: 'var(--color-error)'}} role="alert">
                {errors[field.name]}
              </span>
            ) : null}
          </Label>
        );
      }
    }
  };

  return (
    <Form onSubmit={handleUpdateStep} noValidate>
      <input type="hidden" name="operation_id" value={transactionId} />
      {template
        ? template.map(field => {
            return renderField(field);
          })
        : null}
      {nextStep === 999 ? (
        <article css={{display: 'flex', flexDirection: 'column'}}>
          <Span css={{padding: '1rem 0'}}>К оплате</Span>
          <Span css={{fontSize: '1.2rem', fontWeight: 'bolder'}}>{toCurrency(amount)}</Span>
        </article>
      ) : null}
      <Button type="submit" css={{width: '100%'}}>
        {step === 1 ? 'Найти' : nextStep === 999 ? 'Перейти к оплате' : 'Далее'}
      </Button>
    </Form>
  );
}
