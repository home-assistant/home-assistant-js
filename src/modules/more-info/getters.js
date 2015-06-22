import {isStaleTime} from '../../util';
import {getters as entityGetters} from '../entity';
import {getters as entityHistoryGetters} from '../entity-history';

export const currentEntityId = [
  'moreInfoEntityId'
];

export const currentEntity = [
  currentEntityId,
  entityGetters.entityMap,
  (entityId, entityMap) => entityMap.get(entityId) || null,
];

export const currentEntityHistory = [
  currentEntityId,
  entityHistoryGetters.recentEntityHistoryMap,
  (entityId, map) => map.get(entityId),
]

export const isCurrentEntityHistoryStale = [
  currentEntityId,
  entityHistoryGetters.recentEntityHistoryUpdatedMap,
  (entityId, map) => isStaleTime(map.get(entityId)),
]
