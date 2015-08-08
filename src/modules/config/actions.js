import { callApi } from '../api';
import actionTypes from './action-types';

export function fetchAll() {
  callApi(reactor, 'GET', 'config').then(
    config => configLoaded(reactor, config));
}

export function configLoaded(reactor, config) {
  reactor.dispatch(actionTypes.SERVER_CONFIG_LOADED, config);
}

export function componentLoaded(reactor, component) {
  reactor.dispatch(actionTypes.COMPONENT_LOADED, {component});
}
