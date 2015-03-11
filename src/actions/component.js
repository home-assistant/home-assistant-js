'use strict';

import callApi from '../call_api';
import dispatcher from '../app_dispatcher';
import constants from '../constants';

export function newLoaded(components) {
  dispatcher.dispatch({
    actionType: constants.ACTION_NEW_LOADED_COMPONENTS,
    components: components,
  });
}

export function fetchAll() {
  return callApi('GET', 'components').then(newLoaded);
}
