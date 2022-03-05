import React from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import {useQueryErrorResetBoundary} from 'react-query';
import {ErrorFallback} from '@/screens';
import {handleError} from '@/utils/use-sentry';

// const isDev = process.env.NODE_ENV === 'development'


export function AppErrorBoundary({children}: {children: React.ReactNode}) {
  const {reset} = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback as any} onReset={reset} onError={handleError}>
      {children}
    </ErrorBoundary>
  )
}
