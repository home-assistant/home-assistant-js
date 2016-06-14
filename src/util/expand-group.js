// Returns Immutable list with group states.
// Entities that can't be found will be skipped.
import nuclearJS from 'nuclear-js';

const { toImmutable } = nuclearJS;

export default function expandGroup(groupState, entityMap) {
  return toImmutable(groupState.attributes.entity_id.map(
    entityId => entityMap.get(entityId)).filter(ent => !!ent));
}
