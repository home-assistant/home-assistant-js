import {actions as entityActions} from '../entity';
import {actions as configActions} from '../config';
import {actions as serviceActions} from '../service';

export default function(event) {
  if (__DEV__) {
    console.log(`Remote event received: ${event.event_type}`, event);
  }

  switch (event.event_type) {
    case 'state_changed':
      entityActions.incrementData(event.data.new_state);
      break;

    case 'component_loaded':
      configActions.componentLoaded(event.data.component);
      break;

    case 'service_registered':
      serviceActions.serviceRegistered(event.data.domain, event.data.service);
      break;
  }
}
