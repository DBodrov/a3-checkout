import {apiClient} from './api-client';

export async function readConfig(providerId: string) {
  try {
    const response = await apiClient(`/v1/config/${providerId}`);
    return response;
  } catch (error) {
    throw new Response('Fetch config error', {status: 400, statusText: error as string});
  }
}
