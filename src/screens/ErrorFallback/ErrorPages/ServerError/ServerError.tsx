import React from 'react';
import {Button} from '@a3/frontkit';
import {H1, H2, Span} from '@a3/frontkit';
import {IAppFallbackProps} from '@/screens';

export function ServerError(props: IAppFallbackProps) {
  const {error, resetErrorBoundary} = props;

  // const handleRetry = () => {
  //   if (error.status === 401) {
  //     resetErrorBoundary();
  //   } else if (error.status === 419) {
  //     window.location.reload();
  //   }
  // }


  return (
    <div
      css={{
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        padding: '1rem',
      }}>
      <H1 css={{fontSize: '7vmax', width: '100%', textAlign: 'center', lineHeight: 1}}>{error.status}</H1>
      <H2 css={{fontSize: '3vmax', width: '100%', textAlign: 'center', paddingTop: '1rem', lineHeight: 1}}>
        Что-то пошло не так...
      </H2>
      <Span css={{color: 'var(--color-text-secondary)', padding: '1rem 0'}}>{error.statusText}</Span>
      <Button type="button" onClick={resetErrorBoundary}>Повторить</Button>
    </div>
  );
}
