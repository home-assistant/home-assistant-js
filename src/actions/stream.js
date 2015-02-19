'use strict';

import _ from 'lodash';
import dispatcher from '../app_dispatcher';
import constants from '../constants';
import * as syncActions from './sync';

// maximum time we can go without receiving anything from the server
const MAX_INACTIVITY_TIME = 60000;

let source = null;
let _authToken = null;

// Called on each interaction with the server
// So when debounce is done we exceeded MAX_INACTIVITY_TIME.
// Done because the error event listener on EventSource cannot be trusted.
let scheduleHealthCheck = _.debounce(function() {
  start(_authToken);
}, MAX_INACTIVITY_TIME);

let stopStream = function() {
  source.close();
  source = null;
  _authToken = null;
  scheduleHealthCheck.cancel();
};

export function isSupported() {
  return 'EventSource' in window;
}

export function start(authToken) {
  if (source !== null) {
    stopStream();
  }

  let url = '/api/stream';

  if (authToken) {
    url += '?api_password=' + authToken;
  }

  source = new EventSource(url);
  _authToken = authToken;

  source.addEventListener('open', function() {
    scheduleHealthCheck();

    dispatcher.dispatch({
      actionType: constants.ACTION_STREAM_START,
    });

    // We are streaming, fetch latest info but stop streaming
    syncActions.stop();
    syncActions.fetchAll();
  }, false);

  source.addEventListener('message', function(ev) {
    scheduleHealthCheck();

    if (ev.data === 'ping') {
      return;
    }

    dispatcher.dispatch({
      actionType: constants.ACTION_REMOTE_EVENT_RECEIVED,
      event: JSON.parse(ev.data),
    });
  }, false);

  source.addEventListener('error', function(ev) {
    if (source.readyState !== EventSource.CLOSED) {
      dispatcher.dispatch({
        actionType: constants.ACTION_STREAM_ERROR,
      });
    }
  }, false);

}

export function stop() {
  stopStream();

  dispatcher.dispatch({
    actionType: constants.ACTION_STREAM_STOP,
  });

  syncActions.start();
}
