import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom';
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

ReactDOM.render(
  <StrictMode>
    <Global styles={appStyles} />
    <AppProviders>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppProviders>
  </StrictMode>,
  document.getElementById('root'),
);
