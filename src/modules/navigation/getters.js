export const panels = [
  'panels',
];

export const activePanelName = [
  'currentPanel',
];

export const activePanel = [
  panels,
  activePanelName,
  (pnls, activePane) => pnls.get(activePane) || null,
];

export const showSidebar = [
  'showSidebar',
];
