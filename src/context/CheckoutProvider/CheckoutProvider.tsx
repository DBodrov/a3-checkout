import React from 'react';
import {useParams} from 'react-router-dom';
import {Loader} from '@a3/frontkit';
import {useSettings} from './use-config';
import {useCheckoutQuery} from './use-checkout-query';

const CheckoutContext = React.createContext<{settings: any} | undefined>(undefined);
CheckoutContext.displayName = 'CheckoutContext';

export function CheckoutProvider({children}: {children: React.ReactNode}) {
  const {providerId = ''} = useParams();
  const {settings, isLoading} = useSettings(providerId);
  const {data, status} = useCheckoutQuery(settings?.initParams);
  console.log('transaction ', data)

  if (isLoading) {
    return (
      <Loader fullscreen>
        <span>Загрузка...</span>
      </Loader>
    );
  }

  return <CheckoutContext.Provider value={{settings}}>{children}</CheckoutContext.Provider>;
}

export function useCheckout() {
  const context = React.useContext(CheckoutContext);
  if (!context) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
}
