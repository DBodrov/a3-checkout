import React from 'react';
import {H1, H2} from '@a3/frontkit';

export function NotFound() {
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
      }}
    >
      <H1 css={{fontSize: '7vmax', width: '100%', textAlign: 'center', lineHeight: 1}}>404</H1>
      <H2 css={{fontSize: '3vmax', width: '100%', textAlign: 'center', paddingTop: '1rem', lineHeight: 1}}>
        Страница не найдена
      </H2>
    </div>
  );
}
