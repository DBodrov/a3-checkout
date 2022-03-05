import React from 'react';
import { H1, Input } from '@a3/frontkit';
import {Page} from '@/layouts';
import {useCheckout} from '@/context';

export function CheckoutPage() {
  const {settings} = useCheckout();

  return (
    <Page>
      <H1>{settings.title}</H1>
      <label htmlFor=""></label>
      <Input/>
    </Page>
  )
}
