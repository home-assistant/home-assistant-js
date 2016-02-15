import { actions as entityActions } from '../entity';
import { actions as configActions } from '../config';
import { actions as serviceActions } from '../service';

export default function (reactor, event) {
  if (__DEV__) {
    /* eslint-disable no-console */
    console.log(`Remote event received: ${event.event_type}`, event);
    /* eslint-enable no-console */
  }

  switch (event.event_type) {
    case 'state_changed':
      if (event.data.new_state) {
        entityActions.incrementData(reactor, event.data.new_state);
      } else {
        entityActions.removeData(reactor, event.data.entity_id);
      }

      break;

    case 'component_loaded':
      configActions.componentLoaded(reactor, event.data.component);
      break;

    case 'service_registered':
      serviceActions.serviceRegistered(reactor, event.data.domain, event.data.service);
      break;

    default:
  }
}
