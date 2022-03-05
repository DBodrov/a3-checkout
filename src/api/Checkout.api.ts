import {apiClient} from './api-client';

export type TPaymentParams = {
  paidservice_id: string;
  partner_id: string;
  region_id: string;
};
export async function createTransaction(paymentParams: TPaymentParams) {
  try {
    const searchParams = new URLSearchParams(paymentParams);
    const body = searchParams.toString();
    const response = await apiClient('/front_new/msp/init_step_sequence_obr.do', {
      body,
      customHeaders: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
    });
    if (response.result === 1) {
      return response.item['operation_id']
    }

  } catch (error) {
    throw new Response('Create transaction error', {status: 400, statusText: error as string})
  }
}
