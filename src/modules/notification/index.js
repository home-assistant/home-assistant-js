import notifications from './stores/notification-store';
import * as _actions from './actions';
import * as _getters from './getters';

export function register(reactor) {
  reactor.registerStores({notifications});
}

export const actions = _actions;
export const getters = _getters;
