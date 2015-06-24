export default function paneFilterToPage(pane, filter) {
  return filter ? `${pane}/${filter}` : pane;
}
