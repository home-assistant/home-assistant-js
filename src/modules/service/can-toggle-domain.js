export default function canToggleDomain(domain, servicesMap) {
  if (domain === 'lock') return true;
  if (domain === 'garage_door') return true;
  const serviceDomain = servicesMap.get(domain);
  return !!serviceDomain && serviceDomain.services.has('turn_on');
}
