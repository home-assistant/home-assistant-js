import panels from './stores/panel-store';
import * as _actions from './actions';
import * as _getters from './getters';

export function register(reactor) {
  reactor.registerStores({
    panels,
  });
}

export const actions = _actions;
export const getters = _getters;
