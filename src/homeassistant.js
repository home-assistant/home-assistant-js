'use strict';

var dispatcher = require('./app_dispatcher');

if (__DEV__) {
  dispatcher.register(function(payload) {
    console.log(payload);
  });
}

if (!window.hass) {
  window.hass = {
    callApi: require('./call_api'),
    actions: require('./actions/actions'),
    dispatcher: dispatcher,

    authActions: require('./actions/auth'),
    componentActions: require('./actions/component'),
    eventActions: require('./actions/event'),
    serviceActions: require('./actions/service'),
    stateActions: require('./actions/state'),
    syncActions: require('./actions/sync'),
    stateHistoryActions: require('./actions/state_history'),

    authStore: require('./stores/auth'),
    componentStore: require('./stores/component'),
    eventStore: require('./stores/event'),
    serviceStore: require('./stores/service'),
    stateStore: require('./stores/state'),
    syncStore: require('./stores/sync'),
    stateHistoryStore: require('./stores/state_history'),

    stateModel: require('./models/state'),

    util: require('./util'),
  };
}
