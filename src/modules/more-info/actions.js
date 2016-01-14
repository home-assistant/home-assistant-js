import actionTypes from './action-types';

export function selectEntity(reactor, entityId) {
  reactor.dispatch(actionTypes.SELECT_ENTITY, { entityId });
}

export function deselectEntity(reactor) {
  reactor.dispatch(actionTypes.SELECT_ENTITY, { entityId: null });
}
