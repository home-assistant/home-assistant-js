import Flux from '../../flux';
import selectedNavigationPanel from './stores/selected-navigation-pane-store';
import * as _actions from './actions';
import * as _getters from './getters';

Flux.registerStores({
  selectedNavigationPanel
});

export const actions = _actions;
export const getters = _getters;
