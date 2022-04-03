import React, {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {Global} from '@emotion/react';
import {AppProviders} from '@/context';
// import {initSentry} from '@/utils/use-sentry';
import {App} from './App';
import {appStyles} from './appStyles';

if (process.env.USE_API_MOCKS === 'true') {
  console.info('MOCKS Enabled ', process.env.USE_API_MOCKS);
  const {server} = require('./mock/dev-server');
  server.start();
}

//initSentry();
addVersion();

function addVersion() {
  const body = document.body;
  body.setAttribute('data-version', process.env.VERSION!);
}

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);

root.render(
  <StrictMode>
    <Global styles={appStyles} />
    <AppProviders>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppProviders>
  </StrictMode>,
);
