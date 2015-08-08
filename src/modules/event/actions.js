import { callApi } from '../api';
import { createApiActions } from '../rest-api';
import { actions as notificationActions } from '../notification';
import model from './model';

const eventApiActions = createApiActions(model);

eventApiActions.fireEvent = function fireEvent(reactor, eventType, eventData={}) {
  return callApi(reactor, "POST", `events/${eventType}`, eventData).then(
    () => {
      notificationActions.createNotification(
        reactor,
        `Event ${eventType} successful fired!`);
    }
  );
}

export default eventApiActions;
