'use strict';

if (!window.hass) {
  window.hass = {
    callApi: require('./call_api'),
    actions: require('./actions/actions'),
    dispatcher: require('./app_dispatcher'),

    authActions: require('./actions/auth'),
    componentActions: require('./actions/component'),
    eventActions: require('./actions/event'),
    serviceActions: require('./actions/service'),
    stateActions: require('./actions/state'),
    syncActions: require('./actions/sync'),

    authStore: require('./stores/auth'),
    componentStore: require('./stores/component'),
    eventStore: require('./stores/event'),
    serviceStore: require('./stores/service'),
    stateStore: require('./stores/state'),
    syncStore: require('./stores/sync'),

    stateModel: require('./models/state'),

    util: require('./util'),
  };
}
