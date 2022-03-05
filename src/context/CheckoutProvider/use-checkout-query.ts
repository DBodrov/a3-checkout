import {useQuery} from 'react-query';
import {TPaymentParams, createTransaction} from '@/api/Checkout.api';

export function useCheckoutQuery(paymentParams: TPaymentParams) {
  return useQuery('transactionId', () => createTransaction(paymentParams), {
    enabled: Boolean(paymentParams),
    staleTime: Infinity,
    retry: false,
    useErrorBoundary: true,
  });
}
