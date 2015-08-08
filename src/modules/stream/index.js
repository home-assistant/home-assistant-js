import streamStatus from './stores/stream-status-store';
import * as _actions from './actions';
import * as _getters from './getters';

export function register(reactor) {
  reactor.registerStores({streamStatus});
}

export const actions = _actions;
export const getters = _getters;
