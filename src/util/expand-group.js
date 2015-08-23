// Returns array with group states
export default function expandGroup(groupState, entityMap) {
  return groupState.attributes.entity_id.map(
    entityId => entityMap.get(entityId));
}
