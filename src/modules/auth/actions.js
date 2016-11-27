import actionTypes from './action-types';

import { actions as streamActions } from '../stream';
import { actions as syncActions } from '../sync';

const DEFAULT_ERROR_MSG = 'Unexpected error';

/**
 * Fetch the loaded components as a way to validate the API.
 * Second argument is optional options object:
 *   - rememberLogin: to store login in local storage (default: false)
 *   - host: host to target for API calls
 */
export function validate(reactor, authToken, {
    rememberAuth = false,
    host = '',
  } = {}) {
  if (__DEMO__) {
    /* eslint-disable no-param-reassign */
    host = __DEV__ ? '/static/home-assistant-polymer/node_modules/home-assistant-js/demo_data' :
                     '/demo';
    /* eslint-enable no-param-reassign */
  }

  reactor.dispatch(actionTypes.VALIDATING_AUTH_TOKEN, { authToken, host });

  syncActions.fetchAll(reactor).then(
    () => {
      reactor.dispatch(actionTypes.VALID_AUTH_TOKEN, { authToken, host, rememberAuth });

      if (__DEMO__) {
        // Show as if streaming active in UI
        reactor.dispatch('STREAM_START');
        // No need to start streaming/syncing
        return;
      }

      streamActions.start(reactor, { syncOnInitialConnect: false });
    },

    ({ message = DEFAULT_ERROR_MSG } = {}) => {
      reactor.dispatch(actionTypes.INVALID_AUTH_TOKEN, { errorMessage: message });
    }
  );
}

export function logOut(reactor) {
  reactor.dispatch(actionTypes.LOG_OUT, {});
}
