import entityDomainFilters from '../../util/entity-domain-filters';
import {getters as entityGetters} from '../entity';

export const activePane = [
  'selectedNavigationPanel',
  'pane',
]

export const activeFilter = [
  'selectedNavigationPanel',
  'filter',
]

export const possibleEntityDomainFilters = [
  entityGetters.domainSet,
  domains => domains.filter(domain => domain in entityDomainFilters)
]

export function isActivePane(pane) {
  return [
    activePane,
    activePane => activePane === pane,
  ];
}

export const filteredStates = [
  entityGetters.visibleEntityList,
  activeFilter,
  (entities, filter) => {
    return filter ?
      entities.filter(entity => entity.domain === filter) :
      entities.filter(entity => !(entity.domain in entityDomainFilters));
  }
];
