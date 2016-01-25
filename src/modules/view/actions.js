import actionTypes from './action-types';

export function selectView(reactor, view) {
  reactor.dispatch(actionTypes.SELECT_VIEW, { view });
}
