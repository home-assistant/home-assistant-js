import { callApi } from '../api';
import { actions as notificationActions } from '../notification';
import actionTypes from './action-types';

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export function subscribePushNotifications(reactor) {
  return navigator.serviceWorker.getRegistration()
    .then(reg => {
      return callApi(reactor, 'GET', 'notify.html5/vapid').then((vapid) => {
        return [vapid, reg];
      });
    })
    .then(resp => {
      var vapid = resp[0];
      var reg = resp[1];
      if (!reg) {
        throw new Error('No service worker registered.');
      }

      if (!vapid) {
        throw new Error('No VAPID key found.');
      }

      return reg.pushManager.subscribe({
        applicationServerKey: urlBase64ToUint8Array(vapid),
        userVisibleOnly: true,
      });
    })
    .then(sub => {
      let browserName;
      if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
        browserName = 'firefox';
      } else {
        browserName = 'chrome';
      }

      return callApi(reactor, 'POST', 'notify.html5', {
        subscription: sub,
        browser: browserName,
      }).then(() => reactor.dispatch(actionTypes.PUSH_NOTIFICATIONS_SUBSCRIBE, { }))
        .then(() => true);
    })
    .catch(err => {
      let message;
      if (err.message && err.message.indexOf('gcm_sender_id') !== -1) {
        message = 'Please setup the notify.html5 platform.';
      } else {
        message = 'Notification registration failed.';
      }

      /* eslint-disable no-console */
      console.error(err);
      /* eslint-enable no-console */
      notificationActions.createNotification(reactor, message);

      return false;
    });
}

export function unsubscribePushNotifications(reactor) {
  return navigator.serviceWorker.getRegistration()
    .then(reg => {
      if (!reg) {
        throw new Error('No service worker registered');
      }

      return reg.pushManager.subscribe({
        userVisibleOnly: true,
      });
    })
    .then(sub =>
      callApi(reactor, 'DELETE', 'notify.html5', { subscription: sub })
        .then(() => sub.unsubscribe())
        .then(() => reactor.dispatch(actionTypes.PUSH_NOTIFICATIONS_UNSUBSCRIBE, { }))
        .then(() => true)
    )
    .catch(err => {
      const message = 'Failed unsubscribing for push notifications.';

      /* eslint-disable no-console */
      console.error(err);
      /* eslint-enable no-console */
      notificationActions.createNotification(reactor, message);

      return false;
    });
}
