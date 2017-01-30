import customUi from './stores/custom-ui-store';
import * as _actions from './actions';
import * as _getters from './getters';

export function register(reactor) {
  reactor.registerStores({
    customUi,
  });
}

export const actions = _actions;
export const getters = _getters;
