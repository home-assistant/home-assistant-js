import { getters as authGetters } from '../auth';
import { getters as streamGetters } from '../stream';

const storage = 'localStorage' in window ? localStorage : {};

const observe = {
  authToken: {
    getter: [
      authGetters.currentAuthToken,
      authGetters.rememberAuth,
      function(authToken, rememberAuth) {
        return rememberAuth ? authToken : null;
      },
    ],
    defaultValue: null,
  },
  useStreaming: {
    getter: streamGetters.useStreaming,
    defaultValue: true,
  },
};

const preferences = {};

Object.keys(observe).forEach(function(prop) {
  if (!(prop in storage)) {
    storage[prop] = observe[prop].defaultValue;
  }

  Object.defineProperty(preferences, prop, {
    get: function() { return JSON.parse(storage[prop]); }
  });
});

preferences.startSync = function startSync(reactor) {
  Object.keys(observe).forEach(function(prop) {
    const { getter } = observe[prop];
    const valueChanged = function valueChanged(value) {
      storage[prop] = JSON.stringify(value);
    };
    reactor.observe(getter, valueChanged);
    valueChanged(reactor.evaluate(getter));
  });
};

export default preferences;
