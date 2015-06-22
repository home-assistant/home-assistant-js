
export function isComponentLoaded(component) {
  return [
    ['serverComponent'],
    components => components.contains(component),
  ];
}
