import {setupWorker, rest} from 'msw';
import {configHandlers, paymentHandlers} from './dev-handlers';

export const server = setupWorker(...configHandlers, ...paymentHandlers);

(window as any).msw = {
  server,
  rest,
}
export * from 'msw';
