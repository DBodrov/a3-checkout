import {setupWorker, rest} from 'msw';
import {configHandlers, accountHandlers} from './dev-handlers';

export const server = setupWorker(...configHandlers, ...accountHandlers);

(window as any).msw = {
  server,
  rest,
}
export * from 'msw';
