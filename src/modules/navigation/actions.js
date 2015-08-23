import actionTypes from './action-types';

export function navigate(reactor, pane) {
  reactor.dispatch(actionTypes.NAVIGATE, {pane});
}
