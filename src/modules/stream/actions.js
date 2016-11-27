import { createConnection } from 'home-assistant-js-websocket';
import { getters as authGetters } from '../auth';
import { actions as syncActions } from '../sync';
import actionTypes from './action-types';
import handleRemoteEvent from './handle-remote-event';

const EVENTS = ['state_changed', 'component_loaded', 'service_registered'];
const STREAMS = {};

function stopStream(reactor) {
  const stream = STREAMS[reactor.hassId];

  if (!stream) {
    return;
  }

  stream.socket.close();
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
      window.conn = conn;  // TEMP TODO
      STREAMS[reactor.hassId] = conn;
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
