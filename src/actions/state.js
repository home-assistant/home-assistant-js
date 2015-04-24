import callApi from '../call_api';
import dispatcher from '../app_dispatcher';
import { ACTION_NEW_STATES } from '../constants';
import { notify } from './notification';

export function newStates(states, replace) {
  if (states.length > 0 || replace) {
    dispatcher.dispatch({
      actionType: ACTION_NEW_STATES,
      states: states,
      replace: !!replace,
    });
  }
}

export function set(entityId, state, attributes=false) {
  let payload = {state: state};

  if(attributes) {
    payload.attributes = attributes;
  }

  callApi("POST", "states/" + entityId, payload).then(

    function(newState) {
      notify("State of "+entityId+" set to "+state+".");
      
      newStates([newState]);
    });
}

export function fetch(entityId) {
  callApi("GET", "states/" + entityId).then(
    function(newState) { newStates([newState]); });
}

export function fetchAll() {
  callApi("GET", "states").then(
    function(newJSONStates) { newStates(newJSONStates, true); });
}
