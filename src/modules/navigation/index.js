import selectedNavigationPanel from './stores/selected-navigation-pane-store';
import showSidebar from './stores/show-sidebar-store';
import * as _actions from './actions';
import * as _getters from './getters';
import * as _urlSync from './url-sync';

export function register(reactor) {
  reactor.registerStores({
    selectedNavigationPanel,
    showSidebar,
  });
}

export const actions = _actions;
export const getters = _getters;
export const urlSync = _urlSync;
