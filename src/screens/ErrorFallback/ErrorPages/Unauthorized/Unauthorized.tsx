import React from 'react';
import {Button} from '@a3/frontkit';
import {H1, H2, Span} from '@a3/frontkit';
import {IAppFallbackProps} from '@/screens';

export function Unauthorized(props: IAppFallbackProps) {
  const {error, resetErrorBoundary} = props;
  const errorStatus = error.status;

  const handleRetry = () => {
    if (errorStatus === 401) {
      resetErrorBoundary();
    } else if (errorStatus === 419) {
      window.location.reload();
    }
  };

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
      <H1 css={{fontSize: '7vmax', width: '100%', textAlign: 'center', lineHeight: 1}}>
        {Number(errorStatus)}
      </H1>
      <H2 css={{fontSize: '3vmax', width: '100%', textAlign: 'center', paddingTop: '1rem', lineHeight: 1}}>
        Проблемы с авторизацией
      </H2>
      <Span css={{color: 'var(--color-text-secondary)', padding: '1rem 0'}}>{error.statusText}</Span>
      <Button onClick={handleRetry}>Повторить</Button>
    </div>
  );
}
