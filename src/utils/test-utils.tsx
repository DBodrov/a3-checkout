import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import {render, waitForElementToBeRemoved, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {App} from '../App';
import {AppProviders} from '@/context';

const waitForLoadingFinish = async () => await waitForElementToBeRemoved(() => screen.queryByText(/Загрузка/i));

// const waitForAnketaLoadingFinish = () =>
//   waitForElementToBeRemoved(() => screen.queryByText(/Обновляем анкету/i), {timeout: 15000});

const renderApp = () => {
  return render(
    <AppProviders>
      <MemoryRouter initialEntries={["/7154"]}>
        <App />
      </MemoryRouter>
    </AppProviders>,
  );
};

export * from '@testing-library/react';

export {renderApp, userEvent, waitForLoadingFinish};
