// the pane that is displayed (states, history, logbook)
export const activePane = [
  'selectedNavigationPanel',
];

export function isActivePane(pane) {
  return [
    activePane,
    activePane_ => activePane_ === pane,
  ];
}

export const showSidebar = [
  'showSidebar',
];
