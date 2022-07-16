import React from 'react';
import {} from '@/layouts';
import {useCheckout} from '@/context'

export function PaySuccessPage() {
  const {settings} = useCheckout();

  return <span>SUCCESS</span>
}
