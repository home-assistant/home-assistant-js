import { Record } from 'immutable';
import { parseDateTime } from '../util';

let ImmutableLogbookEntry = new Record({
  when: null,
  name: null,
  message: null,
  domain: null,
  entityId: null,
}, 'LogbookEntry');

export default class LogbookEntry extends ImmutableLogbookEntry {
  constructor(when, name, message, domain, entityId) {
    super({
      when: when,
      name: name,
      message: message,
      domain: domain,
      entityId: entityId,
    });
  }

  static fromJSON({when, name, message, domain, entity_id}) {
    return new LogbookEntry(parseDateTime(when), name, message, domain, entity_id);
  }
}
