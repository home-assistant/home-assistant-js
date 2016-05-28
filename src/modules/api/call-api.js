import { getters as authGetters } from '../auth';

/* eslint-disable import/no-mutable-exports */
let callApi = function callApi(reactor, method, path, parameters = null) {
  const authInfo = reactor.evaluate(authGetters.authInfo);

  const url = `${authInfo.host}/api/${path}`;

  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();
    req.open(method, url, true);
    req.setRequestHeader('X-HA-access', authInfo.authToken);

    req.onload = () => {
      let content;

      try {
        if (req.getResponseHeader('content-type') === 'application/json') {
          content = JSON.parse(req.responseText);
        } else {
          content = req.responseText;
        }
      } catch (err) {
        content = req.responseText;
      }

      if (req.status > 199 && req.status < 300) {
        resolve(content);
      } else {
        reject(content);
      }
    };

    req.onerror = () => reject({});

    if (parameters) {
      req.send(JSON.stringify(parameters));
    } else {
      req.send();
    }
  });
};

if (__DEMO__) {
  callApi = function demoCallAPI(reactor, method, path) {
    return new Promise(resolve => {
      if (method !== 'GET') {
        throw new Error(`Method ${method} not allowed in demo mode.`);
      }

      const component = path.split('/', 1)[0];

      /* eslint-disable global-require */
      switch (component) {
        case 'bootstrap':
          resolve(require('../demo/bootstrap_data.js').default);
          break;
        case 'logbook':
          resolve(require('../demo/logbook_data.js').default);
          break;
        case 'history':
          resolve(require('../demo/state_history_data.js').default);
          break;
        default:
          throw new Error(`URL not implemented in demo mode /api/${path}`);
      }
    });
  };
}

export default callApi;
