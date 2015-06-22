import Flux from '../../flux';
import currentEntityHistoryDate from './stores/current-entity-history-date-store';
import entityHistory from './stores/entity-history-store';
import isLoadingEntityHistory from './stores/is-loading-entity-history-store';
import recentEntityHistory from './stores/recent-entity-history-store';
import recentEntityHistoryUpdated from './stores/recent-entity-history-updated-store';
import * as _actions from './actions';
import * as _getters from './getters';

Flux.registerStores({
  currentEntityHistoryDate,
  entityHistory,
  isLoadingEntityHistory,
  recentEntityHistory,
  recentEntityHistoryUpdated,
});

export const actions = _actions;
export const getters = _getters;
