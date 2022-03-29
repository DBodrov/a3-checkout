import {server, rest} from '@/mock/test-server';
import {
  screen,
  userEvent,
  renderApp,
  waitForLoadingFinish,
  waitForElementToBeRemoved,
  waitFor,
  act,
} from '@/utils/test-utils';

describe('=== Checkout tests ===', () => {
  test('load config, display provider title', async () => {
    renderApp();
    await waitForLoadingFinish();
    expect(screen.queryByText('НУО'));
  });
  test('display Personal Account form', async () => {
    renderApp();
    await waitForLoadingFinish();
    expect(screen.queryByLabelText(/Лицевой счет/i));
  });
  test('happy path', async () => {
    renderApp();
    await waitForLoadingFinish();
    const inputAccount = screen.queryByLabelText(/Лицевой счет/i) as HTMLInputElement;
    const user = userEvent.setup()
    await user.type(inputAccount, '12345678')
    await user.click(screen.getByRole('button', {name: /найти/i}))
    await waitForElementToBeRemoved(() => screen.queryByText(/Инициализация/i));
    expect(screen.queryByText(/Произвольная сумма/i));
    await user.click(screen.getByLabelText(/Произвольная сумма/i));
    await user.click(screen.getByRole('button', {name: /далее/i}))
    await waitForElementToBeRemoved(() => screen.queryByText(/Инициализация/i));
    expect(screen.getByText(/Ведение спец.счета/i))
    expect(screen.getByText(/Взнос за кап. ремонт/i))
    expect(screen.getByRole('button', {name: /Перейти к оплате/i}))
  })
});
