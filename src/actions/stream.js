'use strict';

var dispatcher = require('../app_dispatcher');
var constants = require('../constants');
var syncActions = require('./sync');

var debug = false;
var source = null;
var _authToken = null;

/*
EventSource close event doesn't fire when computer put into sleep mode, ESC is
pressed during loading or when calling window.stop().
https://code.google.com/p/chromium/issues/detail?id=225654

STR: Stream events, call window.stop()

Observe that source.readyState === EventSource.CLOSED and it is not trying to
re-establish a connection.
*/

var _lastError = null;
var _recoveryProtection = null;

var CHROME_RECONNECT_INTERVAL = 3000;
var RECOVERY_CHECK_INTERVAL = 1000;

var startRecoveryProtection = function() {
  var checkState = function() {
    if (debug) console.log("check state, ", source.readyState, _lastError);

    if (source.readyState === EventSource.CLOSED) {
      var now = (new Date()).getTime();

      if (_lastError === null || now - _lastError > CHROME_RECONNECT_INTERVAL) {
        if (debug) console.log("fixing state, now:", now);
        streamActions.start(_authToken);
      }
    }
  };

  _recoveryProtection = setInterval(checkState, RECOVERY_CHECK_INTERVAL);
};

var stopStream = function() {
  source.close();
  source = null;
  _authToken = null;
  _lastError = null;

  clearInterval(_recoveryProtection);
  _recoveryProtection = null;
};

var streamActions = {
  isSupported() {
    return !!EventSource;
  },

  start(authToken) {
    if (source !== null) {
      if (source.readyState === EventSource.OPEN) {
        return;
      } else {
        stopStream();
      }
    }

    var url = '/api/stream';

    if (authToken) {
      url += '?api_password=' + authToken;
    }

    source = new EventSource(url);
    _authToken = authToken;
    startRecoveryProtection();

    source.addEventListener('message', function(ev) {
      dispatcher.dispatch({
        actionType: constants.ACTION_REMOTE_EVENT_RECEIVED,
        event: JSON.parse(ev.data),
      });
    }, false);

    source.addEventListener('open', function() {
      dispatcher.dispatch({
        actionType: constants.ACTION_STREAM_START,
      });

      // We are streaming, stop synchronizing
      syncActions.stopSync();
      // make sure that we have the latest info when we start listening.
      syncActions.fetchAll();
    }, false);

    source.addEventListener('error', function(ev) {
      _lastError = (new Date()).getTime();

      if (source.readyState == EventSource.CLOSED) {
        streamActions.stop();
      } else {
        dispatcher.dispatch({
          actionType: constants.ACTION_STREAM_ERROR,
        });
      }
    }, false);

  },

  stop() {
    stopStream();

    dispatcher.dispatch({
      actionType: constants.ACTION_STREAM_STOP,
    });

    syncActions.sync();
  },

  debug() {
    window._stream_source = source;
    debug = true;
  },
};

module.exports = streamActions;
