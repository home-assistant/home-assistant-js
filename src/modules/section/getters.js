import { Immutable } from 'nuclear-js';
import { getters as entityGetters } from '../entity';

export const currentSection = [
  'currentSection',
];

export const sections = [
  entityGetters.entityMap,
  entities => entities.filter(entity => entity.domain === 'section'),
];

export const currentSectionEntities = [
  entityGetters.entityMap,
  currentSection,
  (entities, section) => {
    let sectionEntity;

    if (section) {
      sectionEntity = entities.get(section);
    }

    if (!sectionEntity) {
      return entities.filter(entity => !entity.attributes.hidden);
    }

    return new Immutable.Map(sectionEntity.attributes.entity_id.map(
      entityId => [entityId, entities.get(entityId)]));
  },
];
