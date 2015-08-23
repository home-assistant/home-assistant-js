import { createByIdGetter, createEntityMapGetter, createHasDataGetter } from '../rest-api';
import model from './model';

export const hasData = createHasDataGetter(model);

export const entityMap = createEntityMapGetter(model);

export const byId = createByIdGetter(model);

export const visibleEntityMap = [
  entityMap,
  entities => entities.filter(entity => !entity.attributes.hidden),
];

/**
 * List of entities sorted by domain.
 */

// export const entityList = [
//   entityMap,
//   map => map.toList().sortBy(entity => entity.domain),
// ];

// export const visibleEntityList = [
//   entityList,
//   entities => entities.filter(entity => !entity.attributes.hidden),
// ];

// export function byDomain(domain) {
//   return [
//     entityList,
//     list => list.filter(entity => entity.domain === domain),
//   ];
// }

// export const domainSet = [
//   entityList,
//   list => list.map(entity => entity.domain).toSet(),
// ];
