export default function pageToPaneFilter(page) {
  const [pane, filter] = page.split('/');
  return {pane, filter};
}
