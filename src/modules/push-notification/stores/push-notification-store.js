import nuclearJS from 'nuclear-js';
import actionTypes from '../action-types';

const { Store, toImmutable } = nuclearJS;

const INSTANCE = new Store({
  getInitialState() {
    return toImmutable({
      supported: 'PushManager' in window &&
                  (document.location.protocol === 'https:' ||
                   document.location.hostname === 'localhost' ||
                   document.location.hostname === '127.0.0.1'),
      active: 'Notification' in window &&
              Notification.permission === 'granted',
    });
  },

  initialize() {
    /* eslint-disable no-use-before-define */
    this.on(actionTypes.PUSH_NOTIFICATIONS_SUBSCRIBE, subscribed);
    this.on(actionTypes.PUSH_NOTIFICATIONS_UNSUBSCRIBE, unsubscribed);
    this.on(actionTypes.LOG_OUT, logOut);
    /* eslint-enable no-use-before-define */
  },
});

export default INSTANCE;

function subscribed(state) {
  return state.set('active', true);
}

function unsubscribed(state) {
  return state.set('active', false);
}

function logOut() {
  return INSTANCE.getInitialState();
}
