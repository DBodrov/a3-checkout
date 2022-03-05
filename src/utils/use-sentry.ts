import * as Sentry from '@sentry/react';
import {Integrations} from '@sentry/tracing';
import {SENTRY_DSN} from './externals';

const isDev = process.env.NODE_ENV === 'development';

export function useSentry() {
  const sentryErrorHandler = (error: unknown, context?: any) => {
    if (context) {
      Sentry.setContext(context.name, context.value);
    }
    Sentry.captureException(new Error(error as string));
  };

  return {sentryErrorHandler};
}

export function initSentry() {
  if (isDev) {
    return;
  }
  Sentry.init({
    dsn: SENTRY_DSN,
    integrations: [new Integrations.BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
    release: `A3-Checkout@${process.env.VERSION}`,
  });
}

async function readErrorFromResponse(error: Response) {
  if (error instanceof Response) {
    return await error.text();
  }
  return error;
}

export function logError(error: Error, errorInfo?: any) {
  console.log('====LOG====', error, errorInfo)
  if (isDev) {
    return;
  }

  Sentry.withScope(scope => {
    errorInfo && scope.setExtras(errorInfo);
    Sentry.captureException(error);
  });
}

export async function handleError(error: any) {
  console.log('handleError ', error)
  let errorInfo: any = {};
  let message = String(error);

  if (!(error instanceof Error) && error.message) {
    errorInfo = error;
    message = error.message;

  } else if (error instanceof Response) {
    message = await readErrorFromResponse(error)
    errorInfo.url = error.url;
    errorInfo.status = error.status;
    errorInfo.statusText = error.statusText;
  }
  error = new Error(message)

  logError(error, errorInfo);
}
