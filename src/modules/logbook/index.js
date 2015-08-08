import currentLogbookDate from './stores/current-logbook-date-store';
import isLoadingLogbookEntries from './stores/is-loading-logbook-entries-store';
import logbookEntries from './stores/logbook-entries-store';
import logbookEntriesUpdated from './stores/logbook-entries-updated-store';
import * as _actions from './actions';
import * as _getters from './getters';

export function register(reactor) {
  reactor.registerStores({
    currentLogbookDate,
    isLoadingLogbookEntries,
    logbookEntries,
    logbookEntriesUpdated,
  });
}

export const actions = _actions;
export const getters = _getters;
