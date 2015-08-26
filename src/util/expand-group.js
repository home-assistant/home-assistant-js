// Returns Immutable list with group states.
// Entities that can't be found will be skipped.
import { toImmutable } from 'nuclear-js';

export default function expandGroup(groupState, entityMap) {
  return toImmutable(groupState.attributes.entity_id.map(
    entityId => entityMap.get(entityId)).filter(ent => !!ent));
}
