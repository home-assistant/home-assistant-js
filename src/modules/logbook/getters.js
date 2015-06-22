import {toImmutable} from 'nuclear-js';

const STALE_TIME = 60000;

function isStaleTime(time) {
  return !time || (new Date()).getTime() - time > STALE_TIME;
}

export const currentDate = [
  'currentLogbookDate',
]

export const isCurrentStale = [
  currentDate,
  ['logbookEntriesUpdated'],
  (currentDate, map) => isStaleTime(map.get(currentDate)),
]

export const currentEntries = [
  currentDate,
  ['logbookEntries'],
  (date, map) => map.get(date) || toImmutable([]),
]

export const isLoadingEntries = [
  'isLoadingLogbookEntries',
]
