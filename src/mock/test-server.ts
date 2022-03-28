import {setupServer} from 'msw/node';
import {rest} from 'msw';
import {configHandlers, accountHandlers} from './test-handlers';

export const server = setupServer(...configHandlers, ...accountHandlers);
export {rest};
