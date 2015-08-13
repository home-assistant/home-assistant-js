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

export function canToggleEntity(entityId) {
  return [
    entityGetters.byId(entityId),
    entityMap,
    (entity, servicesMap) => {
      if (entity.domain === 'group') {
        return entity.state === 'on' || entity.state === 'off';
      }
      const serviceDomain = servicesMap.get(entity.domain);
      return !!serviceDomain && serviceDomain.services.contains('turn_on');
    },
  ];
}
