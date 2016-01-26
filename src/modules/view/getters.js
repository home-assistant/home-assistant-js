import { Immutable } from 'nuclear-js';
import { getters as entityGetters } from '../entity';

export const currentView = [
  'currentView',
];

export const views = [
  entityGetters.entityMap,
  entities => entities.filter(entity => entity.domain === 'group' &&
                                        entity.attributes.view),
];

function addToMap(map, entities, groupEntity) {
  groupEntity.attributes.entity_id.forEach(entityId => {
    if (map.has(entityId)) return;

    const entity = entities.get(entityId);

    if (!entity || entity.attributes.hidden) return;

    map.set(entityId, entity);

    if (entity.domain === 'group') {
      addToMap(map, entities, entity);
    }
  });
}

export const currentViewEntities = [
  entityGetters.entityMap,
  currentView,
  (entities, view) => {
    let viewEntity;

    if (view) {
      viewEntity = entities.get(view);
    }

    if (!viewEntity) {
      return entities.filter(entity => !entity.attributes.hidden);
    }

    return (new Immutable.Map()).withMutations(map => {
      addToMap(map, entities, viewEntity);
    });
  },
];
