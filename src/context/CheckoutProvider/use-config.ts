import {isEmptyString} from '@/utils/string.utils';
import React from 'react';

async function readProviderSettings(providerId: string) {
  const module = await import(`@/partners-settings/${providerId}.json`);
  const settings = await module.default;
  return settings;
}

export function useSettings(providerId: string) {
  const [{status, settings}, setState] = React.useReducer(
    (state: any, change: any) => ({...state, ...change}),
    {status: 'idle', settings: undefined},
  );

  React.useEffect(() => {
    const getSettings = async (providerId: string) => {
      try {
        const providerSettings = await readProviderSettings(providerId);
        setState({status: 'success', settings: providerSettings});
      } catch (error) {
        setState({status: 'error', settings: undefined});
        throw new Response('Error of loading settings', {status: 400, statusText: error as string})
      }
    };

    if (!isEmptyString(providerId)) {
      setState({status: 'loading'});
      getSettings(providerId);
    }
  }, [providerId]);

  return {
    isLoading: status === 'idle' || status === 'loading',
    isError: status === 'error',
    isSuccess: status === 'success',
    settings,
  };
}
