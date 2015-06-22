import Flux from '../../flux';
import actionTypes from './action-types';

export function selectEntity(entityId) {
  Flux.dispatch(actionTypes.SELECT_ENTITY, {entityId});
}

export function deselectEntity() {
  Flux.dispatch(actionTypes.DESELECT_ENTITY, {});
}
