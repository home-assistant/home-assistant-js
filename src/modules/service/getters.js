import { createByIdGetter, createEntityMapGetter, createHasDataGetter } from '../rest-api';
import { getters as entityGetters } from '../entity';
import model from './model';

export const hasData = createHasDataGetter(model);

export const entityMap = createEntityMapGetter(model);

export const byDomain = createByIdGetter(model);

export function hasService(domain, service) {
  return [
    byDomain(domain),
    serviceDomain => !!serviceDomain && serviceDomain.services.contains(service),
  ];
}

export function canToggle(entityId) {
  return [
    entityGetters.byId(entityId),
    entityMap,
    (entity, map) => {
      const serviceDomain = map.get(entity.domain);
      return entity.domain === 'group' ?
        entity.state === 'on' || entity.state === 'off' :
        !!serviceDomain && serviceDomain.services.contains('turn_on');
    },
  ];
}
