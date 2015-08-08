import entityDomainFilters from '../../util/entity-domain-filters';
import {getters as entityGetters} from '../entity';
import paneFilterToPage from './pane-filter-to-page';

// the pane that is displayed (states, history, logbook)
export const activePane = [
  'selectedNavigationPanel',
  'pane',
];

// filter applied to pane
export const activeFilter = [
  'selectedNavigationPanel',
  'filter',
];

// combines pane + filter
export const activePage = [
  activePane,
  activeFilter,
  paneFilterToPage,
];

export const possibleEntityDomainFilters = [
  entityGetters.domainSet,
  domains => domains.filter(domain => domain in entityDomainFilters),
];

export function isActivePane(pane) {
  return [
    activePane,
    activePane_ => activePane_ === pane,
  ];
}

export const filteredStates = [
  entityGetters.visibleEntityList,
  activeFilter,
  (entities, filter) => {
    return filter ?
      entities.filter(entity => entity.domain === filter) :
      entities.filter(entity => !(entity.domain in entityDomainFilters));
  },
];
