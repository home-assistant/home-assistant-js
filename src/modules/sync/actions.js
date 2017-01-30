import actionTypes from './action-types';
import { callApi } from '../api';

import { actions as entityActions } from '../entity';
import { actions as serviceActions } from '../service';
import { actions as eventActions } from '../event';
import { actions as configActions } from '../config';
import { actions as navigationActions } from '../navigation';
import { actions as customUiActions } from '../custom-ui';


export function fetchAll(reactor) {
  reactor.dispatch(actionTypes.API_FETCH_ALL_START, {});

  return callApi(reactor, 'GET', 'bootstrap').then((data) => {
    reactor.batch(() => {
      entityActions.replaceData(reactor, data.states);
      serviceActions.replaceData(reactor, data.services);
      eventActions.replaceData(reactor, data.events);
      configActions.configLoaded(reactor, data.config);
      navigationActions.panelsLoaded(reactor, data.panels);
      customUiActions.customUiLoaded(reactor, data.custom_ui);

      reactor.dispatch(actionTypes.API_FETCH_ALL_SUCCESS, {});
    });
  }, (message) => {
    reactor.dispatch(actionTypes.API_FETCH_ALL_FAIL, { message });

    return Promise.reject(message);
  });
}
