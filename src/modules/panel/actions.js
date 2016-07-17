import actionTypes from './action-types';

export function panelsLoaded(reactor, panels) {
  reactor.dispatch(actionTypes.PANELS_LOADED, { panels });
}
