/**

Put this in your class to have it listen to stores.

When you want to start listening, call this.listenToStores(fireOnListen)
If fireOnListen is true will call all change listeners when they start listening.

When you want to stop listening, call stopListeningToStores()

All functions that you define that follow the format:

  function <storeName>StoreChanged(store);

will be automatically fired on a store change.

*/

_ = require('lodash');

let STORES = {
  'authStoreChanged': require('../stores/auth'),
  'componentStoreChanged': require('../stores/component'),
  'eventStoreChanged': require('../stores/event'),
  'serviceStoreChanged': require('../stores/service'),
  'stateStoreChanged': require('../stores/state'),
  'stateHistoryStoreChanged': require('../stores/state_history'),
  'streamStoreChanged': require('../stores/stream'),
  'syncStoreChanged': require('../stores/sync'),
  'notificationStoreChanged': require('../stores/notification'),
  'voiceStoreChanged': require('../stores/voice'),
  'logbookStoreChanged': require('../stores/logbook'),
};

export function listenToStores(fireOnListen, obj) {
  obj = obj || this
  var storeListeners = [];

  _.forEach(STORES, function(store, listenerName) {
    if (obj[listenerName]) {
      var listener = obj[listenerName].bind(obj, store);

      store.addChangeListener(listener);

      storeListeners.push({store: store, listener: listener});

      if (fireOnListen) {
        listener();
      }
    }
  }.bind(obj));

  obj._storeListeners = storeListeners;
}

export function stopListeningToStores(obj) {
  obj = obj || this
  obj._storeListeners.forEach(function({store, listener}) {
    store.removeChangeListener(listener);
  });
}
