import callApi from '../call_api';
import dispatcher from '../app_dispatcher';
import constants from '../constants';

export function newConfig(config) {
  dispatcher.dispatch({
    actionType: constants.ACTION_NEW_CONFIG,
    config: config,
  });
}

export function fetch() {
  return callApi('GET', 'config').then(newConfig);
}
