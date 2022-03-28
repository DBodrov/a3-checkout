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
    if (response.code === 200) {
      window.location.assign(response.data.url)
    }
  } catch (error) {}
}
