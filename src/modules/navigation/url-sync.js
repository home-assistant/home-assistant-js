/* Keeps the URL in sync with the navigator store */
import Flux from '../../flux';
import { activePane, activeFilter, activePage } from './getters';
import { navigate } from './actions';
import paneFilterToPage from './pane-filter-to-page';
import pageToPaneFilter from './page-to-pane-filter';

const title = 'Home Assistant';

let unwatchObserver;

const isSupported = history.pushState && !__DEMO__;

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
  navigate(pane, filter);
};

export function startSync() {
  if (!isSupported) {
    return;
  }

  initialSync();

  // keep url in sync with state
  unwatchObserver = Flux.observe(activePage, function activePageChanged(page) {
    const state = pageToPaneFilter(page);
    if (!(state.pane === history.state.pane &&
          state.filter == history.state.filter)) {
      history.pushState(state, title, `/${page}`);
    }
  });

  // keep state in sync when url changes via forward/back buttons
  window.addEventListener('popstate', popstateChangeListener);
};

export function stopSync() {
  if (!isSupported) {
    return;
  }

  if (unwatchObserver) {
    unwatchObserver();
  }

  window.removeEventListener('popstate', popstateChangeListener);
}
