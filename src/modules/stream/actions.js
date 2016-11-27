import { createConnection } from 'home-assistant-js-websocket';
import { getters as authGetters } from '../auth';
import { actions as syncActions } from '../sync';
import actionTypes from './action-types';
import handleRemoteEvent from './handle-remote-event';
import debounce from '../../util/debounce';

// maximum time we can go without receiving anything from the server
const MAX_INACTIVITY_TIME = 60000;
const EVENTS = ['state_changed', 'component_loaded', 'service_registered'];
const STREAMS = {};

function stopStream(reactor) {
  const stream = STREAMS[reactor.hassId];

  if (!stream) {
    return;
  }

  stream.scheduleHealthCheck.clear();
  stream.conn.close();
  STREAMS[reactor.hassId] = false;
}

export function start(reactor, { syncOnInitialConnect = true } = {}) {
  stopStream(reactor);

  const authToken = reactor.evaluate(authGetters.authToken);
  let url = document.location.protocol === 'https:' ? 'wss://' : 'ws://';
  url += document.location.hostname;
  if (document.location.port) {
    url += `:${document.location.port}`;
  }
  url += '/api/websocket';

  createConnection(url, { authToken }).then(
    conn => {
      // Websocket connection made for first time
      const scheduleHealthCheck = debounce(() => conn.ping(), MAX_INACTIVITY_TIME);
      scheduleHealthCheck();
      conn.socket.addEventListener('message', scheduleHealthCheck);

      STREAMS[reactor.hassId] = { conn, scheduleHealthCheck };

      EVENTS.forEach(
        eventType => conn.subscribeEvents(
          handleRemoteEvent.bind(null, reactor), eventType));

      reactor.batch(() => {
        reactor.dispatch(actionTypes.STREAM_START);
        if (syncOnInitialConnect) {
          syncActions.fetchAll(reactor);
        }
      });

      conn.addEventListener('disconnected', () => {
        reactor.dispatch(actionTypes.STREAM_ERROR);
      });

      conn.addEventListener('ready', () => {
        reactor.batch(() => {
          reactor.dispatch(actionTypes.STREAM_START);

          // We are streaming, fetch latest info
          syncActions.fetchAll(reactor);
        });
      });
    }
  );
}
