import React from 'react';
import {Outlet} from 'react-router-dom';
import {CheckoutProvider} from '@/context'


export function AppContainer() {

  return (
    <CheckoutProvider>
      <Outlet />
    </CheckoutProvider>
  )


}
