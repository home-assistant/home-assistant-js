'use strict';

import { Record } from 'immutable';
import serviceStore from '../stores/service';
import { parseDateTime } from '../util';

let ImmutableState = new Record({
    entityId: null,
    domain: null,
    object_id: null,
    state: null,
    entityDisplay: null,
    stateDisplay: null,
    lastChanged: null,
    lastChangedAsDate: null,
    attributes: {},
    isCustomGroup: null,
}, 'State');

export default class State extends ImmutableState {
  constructor(entityId, state, lastChanged, attributes={}) {
    let [domain, objectId] = entityId.split(".");
    let stateDisplay = state.replace(/_/g, " ");

    if(attributes.unit_of_measurement) {
      stateDisplay += " " + attributes.unit_of_measurement;
    }

    super({
      entityId: entityId,
      domain: domain,
      objectId: objectId,
      state: state,
      stateDisplay: stateDisplay,
      lastChanged: lastChanged,
      attributes: attributes,
      entityDisplay: attributes.friendly_name || objectId.replace(/_/g, " "),
      lastChangedAsDate: parseDateTime(lastChanged),
      isCustomGroup: domain === "group" && !attributes.auto,
    });
  }

  get canToggle() {
    // groups that have the on/off state or if there is a turn_on service
    return ((this.domain === 'group' &&
             (this.state === 'on' || this.state === 'off')) ||
            serviceStore.has(this.domain, 'turn_on'));
  }

  static fromJSON({entity_id, state, last_changed, attributes}) {
    return new State(entity_id, state, last_changed, attributes);
  }

}
