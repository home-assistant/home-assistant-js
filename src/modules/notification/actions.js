import Flux from '../../flux';
import actionTypes from './action-types';

export function createNotification(message) {
  Flux.dispatch(actionTypes.NOTIFICATION_CREATED, {message})
}
