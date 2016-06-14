import nuclearJS from 'nuclear-js';
import { getters as entityGetters } from '../entity';

const { Immutable } = nuclearJS;
const DEFAULT_VIEW_ENTITY_ID = 'group.default_view';

export const currentView = [
  'currentView',
];

export const views = [
  entityGetters.entityMap,
  entities => entities.filter(entity => entity.domain === 'group' &&
                                        entity.attributes.view &&
                                        entity.entityId !== DEFAULT_VIEW_ENTITY_ID),
];

function addToMap(map, entities, groupEntity, recurse = true) {
  groupEntity.attributes.entity_id.forEach(entityId => {
    if (map.has(entityId)) return;

    const entity = entities.get(entityId);

    if (!entity || entity.attributes.hidden) return;

    map.set(entityId, entity);

    if (entity.domain === 'group' && recurse) {
      addToMap(map, entities, entity, false);
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
    } else {
      // will be undefined if entity does not exist
      viewEntity = entities.get(DEFAULT_VIEW_ENTITY_ID);
    }

    if (!viewEntity) {
      return entities.filter(entity => !entity.attributes.hidden);
    }

    return (new Immutable.Map()).withMutations(map => {
      addToMap(map, entities, viewEntity);
    });
  },
];
