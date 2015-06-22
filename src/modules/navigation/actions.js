import Flux from '../../flux';
import actionTypes from './action-types';

export function navigate(pane, filter=null) {
  Flux.dispatch(actionTypes.NAVIGATE, {pane, filter});
}
