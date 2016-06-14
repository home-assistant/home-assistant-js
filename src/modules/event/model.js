import nuclearJS from 'nuclear-js';
import { callApi } from '../api';

const { Immutable } = nuclearJS;
const ENTITY = 'event';

const ImmutableEvent = new Immutable.Record({
  event: null,
  listenerCount: 0,
}, 'Event');

class Event extends ImmutableEvent {
  constructor(event, listenerCount = 0) {
    super({ event, listenerCount });
  }

  get id() {
    return this.event;
  }

  static fetchAll(reactor) {
    return callApi(reactor, 'GET', 'events');
  }

  static fromJSON({ event, listener_count }) {
    /* eslint-disable camelcase */
    return new Event(event, listener_count);
    /* eslint-enable camelcase */
  }

}

Event.entity = ENTITY;

export default Event;
