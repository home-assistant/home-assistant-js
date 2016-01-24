import currentSection from './stores/current-section-store';
import * as _actions from './actions';
import * as _getters from './getters';

export function register(reactor) {
  reactor.registerStores({ currentSection });
}

export const actions = _actions;
export const getters = _getters;
