import { toImmutable } from 'nuclear-js';

export const isLoadingEntityHistory = [
  'isLoadingEntityHistory',
];

export const currentDate = [
  'currentEntityHistoryDate',
];

export const entityHistoryMap = [
  'entityHistory',
];

export const entityHistoryForCurrentDate = [
  currentDate,
  entityHistoryMap,
  (date, map) => map.get(date) || toImmutable({}),
];

export const hasDataForCurrentDate = [
  currentDate,
  entityHistoryMap,
  (date, map) => !!map.get(date),
];

export const recentEntityHistoryMap = [
  'recentEntityHistory',
];

export const recentEntityHistoryUpdatedMap = [
  'recentEntityHistory',
];
