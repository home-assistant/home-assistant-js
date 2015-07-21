import { Immutable, toJS } from 'nuclear-js';
import { parseDateTime } from '../../util';

import { callApi } from '../api';

const ENTITY = 'entity';

let ImmutableEntity = new Immutable.Record({
  entityId: null,
  domain: null,
  objectId: null,
  state: null,
  entityDisplay: null,
  stateDisplay: null,
  lastChanged: null,
  lastChangedAsDate: null,
  attributes: {},
  isCustomGroup: null,
}, 'Entity');

export default class State extends ImmutableEntity {
  static entity = ENTITY

  constructor(entityId, state, lastChanged, attributes={}) {
    const [domain, objectId] = entityId.split('.');
    let stateDisplay = state.replace(/_/g, ' ');

    if (attributes.unit_of_measurement) {
      stateDisplay += ' ' + attributes.unit_of_measurement;
    }

    super({
      entityId,
      domain,
      objectId,
      state,
      stateDisplay,
      lastChanged,
      attributes,
      entityDisplay: attributes.friendly_name || objectId.replace(/_/g, ' '),
      lastChangedAsDate: parseDateTime(lastChanged),
      isCustomGroup: domain === 'group' && !attributes.auto,
    });
  }

  get id() {
    return this.entityId;
  }

  // get canToggle() {
  //   // groups that have the on/off state or if there is a turn_on service
  //   return ((this.domain === 'group' &&
  //            (this.state === 'on' || this.state === 'off')) ||
  //           serviceStore.has(this.domain, 'turn_on'));
  // }

  static save(instance) {
    const {entityId, state, attributes = {}} = toJS(instance);
    const payload = {state, attributes};

    return callApi('POST', `states/${entityId}`, payload);
  }

  static fetch(id) {
    return callApi('GET', `states/${id}`);
  }

  static fetchAll() {
    return callApi('GET', 'states');
  }

  static fromJSON({entity_id, state, last_changed, attributes}) {
    return new State(entity_id, state, last_changed, attributes);
  }

}
