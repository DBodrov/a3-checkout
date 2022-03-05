import React from 'react';
import {NotFound, Unauthorized, ServerError} from './ErrorPages';

export interface IAppFallbackProps {
  error: Response;
  resetErrorBoundary: (...args: unknown[]) => void;
}
export function ErrorFallback(props: IAppFallbackProps) {
  const {error} = props;
  const errorCode = error.status;
  console.log('fallback error props', props)

  if (errorCode === 404) {
    return <NotFound />
  }
  if (errorCode === 401 || errorCode === 419) {
    return <Unauthorized {...props} />
  }


  return <ServerError {...props} />


}
