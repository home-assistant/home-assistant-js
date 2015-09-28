import { createByIdGetter, createEntityMapGetter, createHasDataGetter } from '../rest-api';
import { getters as entityGetters } from '../entity';
import model from './model';
import canToggleEntityHelper from './can-toggle-entity';

export const hasData = createHasDataGetter(model);

export const entityMap = createEntityMapGetter(model);

export const byDomain = createByIdGetter(model);

export function hasService(domain, service) {
  return [
    byDomain(domain),
    serviceDomain => !!serviceDomain && serviceDomain.services.has(service),
  ];
}

export function canToggleEntity(entityId) {
  return [
    entityGetters.byId(entityId),
    entityMap,
    canToggleEntityHelper,
  ];
}
