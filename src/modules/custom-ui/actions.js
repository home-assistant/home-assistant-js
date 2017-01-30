import actionTypes from './action-types';

export function customUiLoaded(reactor, customUi) {
  reactor.dispatch(actionTypes.CUSTOM_UI_LOADED, { customUi });
}
