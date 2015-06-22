import Flux from '../../flux';
import streamStatus from './stores/stream-status-store';
import * as _actions from './actions';
import * as _getters from './getters';

Flux.registerStores({streamStatus});

export const actions = _actions;
export const getters = _getters;
