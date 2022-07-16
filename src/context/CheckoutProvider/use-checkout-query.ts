import {useQuery, useMutation, useQueryClient} from 'react-query';
import {useSearchParams} from 'react-router-dom';
import {TPaymentParams, createTransaction, getCurrentStep, updateStep} from '@/api/Checkout.api';
import {createPaymentLink, TPaymentLinkParams} from '@/api/Payment.api';

export function useCheckoutQuery(paymentParams: TPaymentParams) {
  const [searchParams] = useSearchParams();
  const transactionId = searchParams.get('transaction_id');
  console.log('trID ', transactionId)

  return useQuery('transactionId', () => Boolean(transactionId) ? transactionId : createTransaction(paymentParams), {
    enabled: Boolean(paymentParams),
    staleTime: Infinity,
    retry: false,
    useErrorBoundary: true,
  });
}

export function useTemplateQuery(transactionId: string) {
  return useQuery('template', () => getCurrentStep(transactionId), {
    enabled: Boolean(transactionId),
    staleTime: Infinity,
    retry: false,
    useErrorBoundary: true,
  });
}

export function useStoreStepQuery() {
  const queryClient = useQueryClient();
  const updateStepMutation = useMutation(stepData => updateStep(stepData), {
    onSuccess: data => {
      queryClient.setQueryData('template', data);
    },
  });
  return updateStepMutation;
}

export function usePaymentLinkQuery() {
  const paymentLinkMutation = useMutation((paymentParams: TPaymentLinkParams) => createPaymentLink(paymentParams), {
    useErrorBoundary: true,
    onSuccess: data => {
      window.location.assign(data.url);
    },
  });

  return paymentLinkMutation;
}
