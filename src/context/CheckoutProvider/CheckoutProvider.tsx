import React from 'react';
import {useParams} from 'react-router-dom';
import {Loader} from '@a3/frontkit';
import {useSettings} from './use-config';
import {useCheckoutQuery, useTemplateQuery, useStoreStepQuery} from './use-checkout-query';
import {TField} from './types';

type TCheckoutContext = {
  settings: any;
  transactionId: string;
  template?: TField[];
  step?: number;
  nextStep?: number;
  isLoading: boolean;
  updateStep: (stepData: any) => void;
};

function readTemplate(templateResponse: Record<string, any>) {
  if (!templateResponse) return;

  const template: TField[] = templateResponse.template.div[0].fields.field;
  const divOrder = templateResponse.template.div[0].order;
  const formFields = template
    .filter(field => field.visible)
    .map(f => {
      return {
        ...f,
        name: `${f.name}$${divOrder}$${f.order}`,
      };
    });

  return formFields;
}

const CheckoutContext = React.createContext<TCheckoutContext | undefined>(undefined);
CheckoutContext.displayName = 'CheckoutContext';

export function CheckoutProvider({children}: {children: React.ReactNode}) {
  const {providerId = ''} = useParams();

  const {settings, isLoading: isConfigLoading} = useSettings(providerId);

  const {data: transactionId} = useCheckoutQuery(settings?.initParams);

  const {
    data: templateQueryData,
    isIdle: isTemplateIdle,
    isLoading: isTemplateLoading,
  } = useTemplateQuery(transactionId);


  const nextStep = templateQueryData?.template?.next_template[0]?.template_id;

  const mutateStep = useStoreStepQuery();
  const {mutate, isLoading: isUpdating} = mutateStep;
  const template = readTemplate(templateQueryData);
  const isLoading = isTemplateIdle || isTemplateLoading || isUpdating;

  if (isConfigLoading) {
    return (
      <Loader fullscreen>
        <span>Загрузка...</span>
      </Loader>
    );
  }

  return (
    <CheckoutContext.Provider
      value={{settings, transactionId, template, updateStep: mutate, step: templateQueryData?.step, isLoading, nextStep}}>
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const context = React.useContext(CheckoutContext);
  if (!context) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
}
