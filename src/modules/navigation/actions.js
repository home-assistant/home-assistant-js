import actionTypes from './action-types';

export function showSidebar(reactor, show) {
  reactor.dispatch(actionTypes.SHOW_SIDEBAR, { show });
}

export function navigate(reactor, pane) {
  reactor.dispatch(actionTypes.NAVIGATE, { pane });
}
