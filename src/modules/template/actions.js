import { callApi } from '../api';

export function render(reactor, template) {
  return callApi(reactor, 'POST', 'template', {template});
}
