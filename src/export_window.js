import homeAssistant from '.';

if (!('hass' in window)) {
  window.hass = homeAssistant;
}
