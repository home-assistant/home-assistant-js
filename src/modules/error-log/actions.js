import { callApi } from '../api';

export function fetchErrorLog(reactor) {
  return callApi(reactor, 'GET', 'error_log');
}
