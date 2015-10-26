
export const locationGPS = [
  ['serverConfig', 'latitude'],
  ['serverConfig', 'longitude'],
  (latitude, longitude) => { return {latitude, longitude}; },
];

export const locationName = [
  'serverConfig',
  'location_name',
];

export const serverVersion = [
  'serverConfig',
  'serverVersion',
];

export function isComponentLoaded(component) {
  return [
    ['serverComponent'],
    components => components.contains(component),
  ];
}
