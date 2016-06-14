import { getters as authGetters } from '../auth';

export default function callApi(reactor, method, path, parameters = null) {
  const authInfo = reactor.evaluate(authGetters.authInfo);
  const url = `${authInfo.host}/api/${path}`;

  if (__DEMO__) {
    const component = path.split('/', 1)[0];
    let data;
    switch (component) {
      case 'bootstrap':
        data = window.hassDemoData.bootstrap;
        break;
      case 'logbook':
        data = window.hassDemoData.logbook;
        break;
      case 'history':
        data = window.hassDemoData.stateHistory;
        break;
      default:
        data = false;
    }
    return new Promise((resolve, reject) => {
      if (data) {
        resolve(data);
      } else {
        reject('Request not allowed in demo mode.');
      }
    });
  }

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
}
