import { localStoragePreferences } from './modules/preferences';
import createReactor from './util/create-reactor';
import exposeModule from './util/expose-module';
import util from './util/ui-util';

import * as auth from './modules/auth';
import * as config from './modules/config';
import * as entity from './modules/entity';
import * as entityHistory from './modules/entity-history';
import * as event from './modules/event';
import * as logbook from './modules/logbook';
import * as moreInfo from './modules/more-info';
import * as navigation from './modules/navigation';
import * as notification from './modules/notification';
import * as service from './modules/service';
import * as stream from './modules/stream';
import * as sync from './modules/sync';
import * as voice from './modules/voice';
import * as restApi from './modules/rest-api';

const reactor = createReactor();

const hass = {
  reactor,
  localStoragePreferences,
  util,
  demo: __DEMO__,
  urlSync: navigation.urlSync,
}

exposeModule(hass, reactor, 'auth', auth);
exposeModule(hass, reactor, 'config', config);
exposeModule(hass, reactor, 'entity', entity);
exposeModule(hass, reactor, 'entityHistory', entityHistory);
exposeModule(hass, reactor, 'event', event);
exposeModule(hass, reactor, 'logbook', logbook);
exposeModule(hass, reactor, 'moreInfo', moreInfo);
exposeModule(hass, reactor, 'navigation', navigation);
exposeModule(hass, reactor, 'notification', notification);
exposeModule(hass, reactor, 'service', service);
exposeModule(hass, reactor, 'stream', stream);
exposeModule(hass, reactor, 'sync', sync);
exposeModule(hass, reactor, 'voice', voice);
exposeModule(hass, reactor, 'restApi', restApi);

export default hass;
