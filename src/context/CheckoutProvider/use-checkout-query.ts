import {useQuery, useMutation, useQueryClient} from 'react-query';
import {TPaymentParams, createTransaction, getCurrentStep, updateStep} from '@/api/Checkout.api';

export function useCheckoutQuery(paymentParams: TPaymentParams) {
  return useQuery('transactionId', () => createTransaction(paymentParams), {
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
    onSuccess: data  => {
      queryClient.setQueryData('template', data);
    },
  });
  return updateStepMutation;
}
