import serverComponent from './stores/server-component-store';
import serverConfig from './stores/server-config-store';
import * as _actions from './actions';
import * as _getters from './getters';

export function register(reactor) {
  reactor.registerStores({serverComponent, serverConfig});
}

export const actions = _actions;
export const getters = _getters;
