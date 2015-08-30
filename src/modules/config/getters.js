
export const locationName = [
  'serverConfig',
  'location_name',
];

export function isComponentLoaded(component) {
  return [
    ['serverComponent'],
    components => components.contains(component),
  ];
}
