export default function canToggleDomain(domain, servicesMap) {
  const serviceDomain = servicesMap.get(domain);
  return !!serviceDomain && serviceDomain.services.contains('turn_on');
}
