import Flux from '../../flux';
import callApi from '../../call-api';
import actionTypes from './action-types';

export function fetchAll() {
  callApi('GET', 'config').then(configLoaded);
}

export function configLoaded(config) {
  Flux.dispatch(actionTypes.SERVER_CONFIG_LOADED, config);
}

export function componentLoaded(component) {
  Flux.dispatch(actionTypes.COMPONENT_LOADED, {component});
}
