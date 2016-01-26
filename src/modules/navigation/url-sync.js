/* Keeps the URL in sync with the navigator store */
import {
  getters as moreInfoGetters,
  actions as moreInfoActions,
} from '../more-info';
import {
  getters as viewGetters,
  actions as viewActions,
} from '../view';
import { activePane } from './getters';
import { navigate } from './actions';

const IS_SUPPORTED = history.pushState && !__DEMO__;
const PAGE_TITLE = 'Home Assistant';
const SYNCS = {};

function getSync(reactor) {
  return SYNCS[reactor.hassId];
}

function pageState(pane, view) {
  const state = { pane };
  if (pane === 'states') {
    state.view = view;
  }
  return state;
}

function pageUrl(pane, view) {
  return pane === 'states' && view ?
    `/${pane}/${view}` : `/${pane}`;
}


function initialSync(reactor) {
  let pane;
  let view;
  // store current state in url or set state based on url
  if (window.location.pathname === '/') {
    pane = reactor.evaluate(activePane);
    view = reactor.evaluate(viewGetters.currentView);
  } else {
    const parts = window.location.pathname.substr(1).split('/');
    pane = parts[0];
    if (pane === 'states' && parts.length > 1) {
      view = parts[1];
    } else {
      view = null;
    }
    reactor.batch(() => {
      navigate(reactor, pane);
      if (view) {
        viewActions.selectView(reactor, view);
      }
    });
  }
  history.replaceState(pageState(pane, view), PAGE_TITLE, pageUrl(pane, view));
}

function popstateChangeListener(reactor, ev) {
  const { pane, view } = ev.state;

  if (reactor.evaluate(moreInfoGetters.hasCurrentEntityId)) {
    getSync(reactor).ignoreNextDeselectEntity = true;
    moreInfoActions.deselectEntity(reactor);
  } else if (pane !== reactor.evaluate(activePane) ||
             view !== reactor.evaluate(viewGetters.currentView)) {
    reactor.batch(() => {
      navigate(reactor, pane);
      if (view !== undefined) {
        viewActions.selectView(reactor, view);
      }
    });
  }
}

export function startSync(reactor) {
  if (!IS_SUPPORTED) {
    return;
  }

  initialSync(reactor);

  const sync = {
    ignoreNextDeselectEntity: false,
    popstateChangeListener: popstateChangeListener.bind(null, reactor),
    unwatchNavigationObserver: reactor.observe(activePane, pane => {
      if (pane !== history.state.pane) {
        history.pushState(pageState(pane, history.state.view), PAGE_TITLE,
                          pageUrl(pane, history.state.view));
      }
    }),
    unwatchViewObserver: reactor.observe(viewGetters.currentView, view => {
      if (view !== history.state.view) {
        history.pushState(pageState(history.state.pane, view), PAGE_TITLE,
                          pageUrl(history.state.pane, view));
      }
    }),
    unwatchMoreInfoObserver: reactor.observe(
      moreInfoGetters.hasCurrentEntityId,
      (moreInfoEntitySelected) => {
        if (moreInfoEntitySelected) {
          history.pushState(history.state, PAGE_TITLE, window.location.pathname);
        } else if (sync.ignoreNextDeselectEntity) {
          sync.ignoreNextDeselectEntity = false;
        } else {
          history.back();
        }
      }
    ),
  };

  SYNCS[reactor.hassId] = sync;

  // keep state in sync when url changes via forward/back buttons
  window.addEventListener('popstate', sync.popstateChangeListener);
}

export function stopSync(reactor) {
  if (!IS_SUPPORTED) {
    return;
  }

  const sync = getSync(reactor);
  if (!sync) {
    return;
  }

  sync.unwatchNavigationObserver();
  sync.unwatchViewObserver();
  sync.unwatchMoreInfoObserver();
  window.removeEventListener('popstate', sync.popstateChangeListener);
  SYNCS[reactor.hassId] = false;
}
