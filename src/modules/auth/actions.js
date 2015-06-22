import Flux from '../../flux';
import actionTypes from './action-types';

import { getters as streamGetters } from '../stream';
import { actions as streamActions } from '../stream';
import { actions as syncActions } from '../sync';

const DEFAULT_ERROR_MSG = 'Unexpected result from API';

/**
 * Fetch the loaded components as a way to validate the API.
 * Second argument is optional options object:
 *   - useStreaming: to enable streaming (default: true if supported)
 *   - rememberLogin: to store login in local storage (default: false)
 *   - host: host to target for API calls
 */
export function validate(authToken, {
    useStreaming=Flux.evaluate(streamGetters.isSupported),
    rememberAuth=false,
    host='',
  } = {}) {
  Flux.dispatch(actionTypes.VALIDATING_AUTH_TOKEN, {authToken, host});

  syncActions.fetchAll().then(
    () => {
      Flux.dispatch(actionTypes.VALID_AUTH_TOKEN, {authToken, host, rememberAuth});

      if (useStreaming) {
        streamActions.start({syncOnInitialConnect: false});
      } else {
        syncActions.start({skipInitialSync: true});
      }
    },

    ({message=DEFAULT_ERROR_MSG}={}) => {
      Flux.dispatch(actionTypes.INVALID_AUTH_TOKEN, {errorMessage: message});
    }
  );
}

export function logOut() {
  Flux.dispatch(actionTypes.LOG_OUT, {});
}
