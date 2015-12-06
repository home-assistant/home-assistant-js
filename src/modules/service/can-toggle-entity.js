import canToggleDomain from './can-toggle-domain';

export default function canToggleEntity(entity, servicesMap) {
  if (!entity) {
    return false;
  }
  if (entity.domain === 'group') {
    return entity.state === 'on' || entity.state === 'off';
  }
  return canToggleDomain(entity.domain, servicesMap);
}
