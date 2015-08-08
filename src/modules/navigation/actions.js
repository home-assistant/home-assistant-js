import actionTypes from './action-types';

export function navigate(reactor, pane, filter=null) {
  reactor.dispatch(actionTypes.NAVIGATE, {pane, filter});
}
