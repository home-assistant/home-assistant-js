import { Store, Immutable, toImmutable } from 'nuclear-js';
import actionTypes from '../action-types';

class NotificationStore extends Store {
  getInitialState() {
    return new Immutable.OrderedMap();
  }

  initialize() {
    this.on(actionTypes.NOTIFICATION_CREATED, notificationCreated);
    this.on(actionTypes.LOG_OUT, logOut);
  }
}

const INSTANCE = new NotificationStore();

export default INSTANCE;

function notificationCreated(state, {message}) {
  return state.set(state.size, message)
}

function logOut(state) {
  return INSTANCE.getInitialState();
}
