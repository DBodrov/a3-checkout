import React from 'react';
import {useConfig} from '@/context';
import {readTNSUrlsById} from '@/utils/constants';
import {Nav} from './styles';

export function Navbar() {
  const {config, providerId, queryParams} = useConfig();
  const urlParams = readTNSUrlsById(providerId as string);
  const url = queryParams?.get('url');

  return (
    <Nav>
      <section
        css={{
          display: 'flex',
          flexFlow: 'row nowrap',
          justifyContent: 'space-between',
          maxWidth: 704,
          width: '100%',
          padding: '0 1rem',
        }}
      >
        {providerId ? (
          <a href={urlParams?.homeUrl} title={config?.title}>
            <img css={{width: 120, height: 60}} src={urlParams?.logo} alt="" />
          </a>
        ) : null}
        {url ? (
          <a css={{alignSelf: 'center', color: 'var(--color-link)', textDecoration: 'none'}} href={url}>
            Вернуться на главную
          </a>
        ) : null}
      </section>
    </Nav>
  );
}
