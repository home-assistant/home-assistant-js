import { toImmutable } from 'nuclear-js';
import Flux from '../../flux';

Flux.registerStores({
  restApiCache: require('./stores/rest-api-cache-store'),
});

export const createApiActions = require('./create-api-actions');

/**
 * Creates a getter if a particular entity has data.
 */
export function createHasDataGetter(model) {
  return [
    ['restApiCache', model.entity],
    entityMap => !!entityMap,
  ];
}

/**
 * Creates a getter to the restApiCache store for a particular entity
 * This decouples the implementation details of the RestApi module's caching
 * to consumers of the cached data
 * @param {Model} model
 */
export function createEntityMapGetter(model) {
  return [
    ['restApiCache', model.entity],
    entityMap => entityMap || toImmutable({}),
  ];
}

/**
 * Creates a function that creates a getter that looks up the entity in the restApiCache by ID
 * @param {Model} model
 */
export function createByIdGetter(model) {
  return function idGetter(id) {
    return ['restApiCache', model.entity, id];
  };
}
