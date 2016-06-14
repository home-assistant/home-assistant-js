import nuclearJS from 'nuclear-js';

const { toImmutable } = nuclearJS;
const STALE_TIME = 60000;

function isStaleTime(time) {
  return !time || (new Date()).getTime() - time > STALE_TIME;
}

export const currentDate = [
  'currentLogbookDate',
];

export const isCurrentStale = [
  currentDate,
  ['logbookEntriesUpdated'],
  (currentDate_, map) => isStaleTime(map.get(currentDate_)),
];

export const currentEntries = [
  currentDate,
  ['logbookEntries'],
  (date, map) => map.get(date) || toImmutable([]),
];

export const isLoadingEntries = [
  'isLoadingLogbookEntries',
];
