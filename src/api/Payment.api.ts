import {apiClient} from './api-client';

export type TPaymentLinkParams = {
  amount: number;
  transactionId: string;
  description?: string;
};

export async function createPaymentLink(paymentLinkParams: TPaymentLinkParams) {
  try {
    const response = await apiClient('/.netlify/functions/paymentLinkService', {
      body: JSON.stringify({...paymentLinkParams}),
      customHeaders: {
        'Content-type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw new Response('Create payment link error', {status: 400, statusText: error as string})
  }
}
