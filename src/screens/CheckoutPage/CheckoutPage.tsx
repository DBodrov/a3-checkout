import React from 'react';
import {H1, Loader} from '@a3/frontkit';
import {Page} from '@/layouts';
import {useCheckout} from '@/context';
import {CheckoutForm} from './CheckoutForm';

export function CheckoutPage() {
  const {settings, isLoading} = useCheckout();
  console.log('isLoading', isLoading)

  return (
    <Page>
      <H1 css={{padding: '1rem 0'}}>{settings.title}</H1>
      {isLoading ? (
        <Loader>
          <span>Инициализация...</span>
        </Loader>
      ) : (
        <CheckoutForm />
      )}
    </Page>
  );
}
