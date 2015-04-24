import { Record } from 'immutable';

let ImmutableNotification = new Record({
  id: null,
  message: null,
}, 'Notification');

export default class Notification extends ImmutableNotification {
  constructor(id, message) {
    super({
      id: id,
      message: message,
    });
  }
}
