/* Keeps the URL in sync with the navigator store */
import Flux from '../../flux';
import {
  getters as moreInfoGetters,
  actions as moreInfoActions
} from '../more-info';
import { activePane, activeFilter, activePage } from './getters';
import { navigate } from './actions';
import paneFilterToPage from './pane-filter-to-page';
import pageToPaneFilter from './page-to-pane-filter';

const isSupported = history.pushState && !__DEMO__;
const title = 'Home Assistant';

let ignoreNextDeselectEntity = false;
let unwatchNavigationObserver;
let unwatchMoreInfoObserver;

function initialSync() {
  let pane, filter, url;
  // store current state in url or set state based on url
  if (location.pathname === '/') {
    pane = Flux.evaluate(activePane);
    filter = Flux.evaluate(activeFilter);
    url = paneFilterToPage(pane, filter);
  } else {
    const paneFilter = pageToPaneFilter(location.pathname.substr(1));
    pane = paneFilter.pane;
    filter = paneFilter.filter;
    url = location.pathname;
    navigate(pane, filter);
  }
  history.replaceState({pane, filter}, title, url);
}

function popstateChangeListener(ev) {
  const {pane, filter} = ev.state;

  if (Flux.evaluate(moreInfoGetters.hasCurrentEntityId)) {
    ignoreNextDeselectEntity = true;
    moreInfoActions.deselectEntity();
  } else {
    navigate(pane, filter);
  }
};

export function startSync() {
  if (!isSupported) {
    return;
  }

  initialSync();

  // keep url in sync with state
  unwatchNavigationObserver = Flux.observe(activePage, (page) => {
    const state = pageToPaneFilter(page);
    if (!(state.pane === history.state.pane &&
          state.filter == history.state.filter)) {
      history.pushState(state, page, `/${page}`);
    }
  });

  unwatchMoreInfoObserver = Flux.observe(
    moreInfoGetters.hasCurrentEntityId,
    (moreInfoEntitySelected) => {
      if (moreInfoEntitySelected) {
        history.pushState(history.state, title, location.pathname);
      } else if (ignoreNextDeselectEntity) {
        ignoreNextDeselectEntity = false;
      } else {
        history.back();
      }
    }
  );

  // keep state in sync when url changes via forward/back buttons
  window.addEventListener('popstate', popstateChangeListener);
};

export function stopSync() {
  if (!isSupported) {
    return;
  }

  if (unwatchNavigationObserver) {
    unwatchNavigationObserver();
    unwatchMoreInfoObserver();
  }

  window.removeEventListener('popstate', popstateChangeListener);
}
