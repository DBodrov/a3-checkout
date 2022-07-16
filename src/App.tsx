import React from 'react';
import {Routes, Route} from 'react-router-dom';
// import {PaymentPage, NotFound, PaySuccessPage, PayFailPage, ThreeDSPage} from '@/screens';
import {AppContainer} from '@/layouts';
import {CheckoutPage, NotFound, PaySuccessPage} from '@/screens';

export function App() {
  return (
    <Routes>
      <Route path=":providerId" element={<AppContainer />}>
        <Route index element={<CheckoutPage />} />
        <Route path="success" element={<PaySuccessPage />} />
        {/* <Route path="threeds" element={<ThreeDSPage />} />
        <Route path="fail" element={<PayFailPage />} /> */}
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
