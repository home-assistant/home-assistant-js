import dispatcher from './app_dispatcher';

if (__DEV__) {
  dispatcher.register(function(payload) {
    console.log(payload);
  });
}

export let hass = {
  callApi: require('./call_api'),
  dispatcher: dispatcher,
  constants: require('./constants'),
  util: require('./util'),

  authActions: require('./actions/auth'),
  componentActions: require('./actions/component'),
  eventActions: require('./actions/event'),
  serviceActions: require('./actions/service'),
  stateActions: require('./actions/state'),
  syncActions: require('./actions/sync'),
  stateHistoryActions: require('./actions/state_history'),
  streamActions: require('./actions/stream'),
  voiceActions: require('./actions/voice'),
  logbookActions: require('./actions/logbook'),

  authStore: require('./stores/auth'),
  componentStore: require('./stores/component'),
  eventStore: require('./stores/event'),
  serviceStore: require('./stores/service'),
  stateStore: require('./stores/state'),
  syncStore: require('./stores/sync'),
  stateHistoryStore: require('./stores/state_history'),
  streamStore: require('./stores/stream'),
  preferenceStore: require('./stores/preference'),
  notificationStore: require('./stores/notification'),
  voiceStore: require('./stores/voice'),
  logbookStore: require('./stores/logbook'),

  stateModel: require('./models/state'),

  storeListenerMixIn: require('./mixins/store_listener'),
};

if (!('hass' in window)) {
    window.hass = hass;
}
