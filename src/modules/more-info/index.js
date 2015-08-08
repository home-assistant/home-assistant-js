import moreInfoEntityId from './stores/current-entity-id-store';
import * as _actions from './actions';
import * as _getters from './getters';

export function register(reactor) {
  reactor.registerStores({moreInfoEntityId});
}

export const actions = _actions;
export const getters = _getters;
