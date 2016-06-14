import nuclearJS from 'nuclear-js';
import parseDateTime from '../../util/parse-date-time-str';

const { Immutable } = nuclearJS;

const ImmutableLogbookEntry = new Immutable.Record({
  when: null,
  name: null,
  message: null,
  domain: null,
  entityId: null,
}, 'LogbookEntry');

export default class LogbookEntry extends ImmutableLogbookEntry {
  constructor(when, name, message, domain, entityId) {
    super({
      when,
      name,
      message,
      domain,
      entityId,
    });
  }

  static fromJSON({ when, name, message, domain, entity_id }) {
    /* eslint-disable camelcase */
    return new LogbookEntry(parseDateTime(when), name, message, domain, entity_id);
    /* eslint-enable camelcase */
  }
}
