import pushNotifications from './stores/push-notification-store';
import * as _actions from './actions';
import * as _getters from './getters';

export function register(reactor) {
  reactor.registerStores({ pushNotifications });
}

export const actions = _actions;
export const getters = _getters;
