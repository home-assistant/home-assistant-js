import debounce from 'debounce';
import { getters as authGetters } from '../auth';
import { actions as syncActions } from '../sync';
import actionTypes from './action-types';
import handleRemoteEvent from './handle-remote-event';

// maximum time we can go without receiving anything from the server
const MAX_INACTIVITY_TIME = 60000;
const STREAMS = {};
const EVENTS = ['state_changed', 'component_loaded', 'service_registered'].join(',');

function stopStream(reactor) {
  const stream = STREAMS[reactor.hassId];

  if (!stream) {
    return;
  }

  stream.scheduleHealthCheck.cancel();
  stream.source.close();
  STREAMS[reactor.hassId] = false;
}

export function start(reactor, { syncOnInitialConnect = true } = {}) {
  stopStream(reactor);

  // Called on each interaction with EventSource
  // When debounce is done we exceeded MAX_INACTIVITY_TIME.
  // Why? Because the error event listener on EventSource cannot be trusted.
  const scheduleHealthCheck = debounce(start.bind(null, reactor), MAX_INACTIVITY_TIME);
  const authToken = reactor.evaluate(authGetters.authToken);
  const source = new EventSource(`/api/stream?api_password=${authToken}&restrict=${EVENTS}`);
  let syncOnConnect = syncOnInitialConnect;

  STREAMS[reactor.hassId] = {
    source,
    scheduleHealthCheck,
  };

  source.addEventListener('open', () => {
    scheduleHealthCheck();

    reactor.batch(() => {
      reactor.dispatch(actionTypes.STREAM_START);

      // We are streaming, fetch latest info but stop syncing
      syncActions.stop(reactor);

      if (syncOnConnect) {
        syncActions.fetchAll(reactor);
      } else {
        syncOnConnect = true;
      }
    });
  }, false);

  source.addEventListener('message', (ev) => {
    scheduleHealthCheck();

    if (ev.data !== 'ping') {
      handleRemoteEvent(reactor, JSON.parse(ev.data));
    }
  }, false);

  source.addEventListener('error', () => {
    scheduleHealthCheck();

    if (source.readyState !== EventSource.CLOSED) {
      reactor.dispatch(actionTypes.STREAM_ERROR);
    }
  }, false);
}

export function stop(reactor) {
  stopStream(reactor);

  reactor.batch(() => {
    reactor.dispatch(actionTypes.STREAM_STOP);

    syncActions.start(reactor);
  });
}
