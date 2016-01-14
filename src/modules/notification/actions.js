import actionTypes from './action-types';

export function createNotification(reactor, message) {
  reactor.dispatch(actionTypes.NOTIFICATION_CREATED, { message });
}
