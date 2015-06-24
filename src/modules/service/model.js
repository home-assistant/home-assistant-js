import { Immutable, toImmutable } from 'nuclear-js';
import callApi from '../../call-api';

const ENTITY = 'service';

let ImmutableService = new Immutable.Record({
  domain: null,
  services: [],
}, 'ServiceDomain');

export default class ServiceDomain extends ImmutableService {
  static entity = ENTITY

  constructor(domain, services) {
    super({domain, services});
  }

  get id() {
    return this.domain;
  }

  static fetchAll() {
    return callApi('GET', 'services');
  }

  static fromJSON({domain, services}) {
    return new ServiceDomain(domain, toImmutable(services));
  }

}
