import React from 'react';
import {useQuery} from 'react-query';
import {readConfig} from '@/api/Config.api';
import {isEmptyString} from '@/utils/string.utils';

async function readProviderSettings(providerId: string) {
  const module = await import(`@/partners-settings/${providerId}.json`);
  const settings = await module.default;
  return settings;
}

export function useSettings(providerId: string) {
  return useQuery('settings', () => readConfig(providerId), {
    enabled: Boolean(providerId),
    staleTime: Infinity,
    useErrorBoundary: true,
  })
}
