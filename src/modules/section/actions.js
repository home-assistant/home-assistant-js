import actionTypes from './action-types';

export function selectSection(reactor, section) {
  reactor.dispatch(actionTypes.SELECT_SECTION, { section });
}
