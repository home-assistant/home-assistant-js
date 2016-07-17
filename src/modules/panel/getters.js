import { getters as navigationGetters } from '../navigation';

export const panels = [
  'panels',
];

export const activePanel = [
  panels,
  navigationGetters.activePane,
  (pnls, activePane) => pnls.get(activePane),
];
