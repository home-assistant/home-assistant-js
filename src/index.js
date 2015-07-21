import reactor from './flux';
import { localStoragePreferences } from './modules/preferences';
import * as util from './util';

import { register as registerRestApi } from './modules/rest-api';
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
import { register } from './modules/rest-api';

registerRestApi(reactor);
auth.register(reactor);
config.register(reactor);
entityHistory.register(reactor);
logbook.register(reactor);
moreInfo.register(reactor);
navigation.register(reactor);
notification.register(reactor);
stream.register(reactor);
sync.register(reactor);
voice.register(reactor);

export default {
  reactor,
  localStoragePreferences,
  util,
  demo: __DEMO__,
  urlSync: navigation.urlSync,

  authActions: auth.actions,
  authGetters: auth.getters,
  configActions: config.actions,
  configGetters: config.getters,
  entityActions: entity.actions,
  entityGetters: entity.getters,
  entityHistoryActions: entityHistory.actions,
  entityHistoryGetters: entityHistory.getters,
  eventActions: event.actions,
  eventGetters: event.getters,
  logbookActions: logbook.actions,
  logbookGetters: logbook.getters,
  moreInfoActions: moreInfo.actions,
  moreInfoGetters: moreInfo.getters,
  navigationActions: navigation.actions,
  navigationGetters: navigation.getters,
  notificationActions: notification.actions,
  notificationGetters: notification.getters,
  serviceActions: service.actions,
  serviceGetters: service.getters,
  streamActions: stream.actions,
  streamGetters: stream.getters,
  syncActions: sync.actions,
  syncGetters: sync.getters,
  voiceActions: voice.actions,
  voiceGetters: voice.getters,
};
