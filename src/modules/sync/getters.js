import { getters as entityGetters } from '../entity';
import { getters as eventGetters } from '../event';
import { getters as serviceGetters } from '../service';

export const isDataLoaded = [
  entityGetters.hasData,
  eventGetters.hasData,
  serviceGetters.hasData,
  (hasEntityData, hasEventData, hasServiceData) =>
    hasEntityData && hasEventData && hasServiceData,
];

export const isFetching = [
  'isFetchingData',
];
