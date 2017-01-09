const hasMediaStates = ['playing', 'paused', 'unknown'];

export default class MediaPlayer {
  constructor(hass, stateObj) {
    this.serviceActions = hass.serviceActions;
    this.stateObj = stateObj;
  }

  get isOff() {
    return this.stateObj.state === 'off';
  }

  get isIdle() {
    return this.stateObj.state === 'idle';
  }

  get isMuted() {
    return this.stateObj.attributes.is_volume_muted;
  }

  get isPaused() {
    return this.stateObj.state === 'paused';
  }

  get isPlaying() {
    return this.stateObj.state === 'playing';
  }

  get isMusic() {
    return this.stateObj.attributes.media_content_type === 'music';
  }

  get isTVShow() {
    return this.stateObj.attributes.media_content_type === 'tvshow';
  }

  get hasMediaControl() {
    return hasMediaStates.indexOf(this.stateObj.state) !== -1;
  }

  get volumeSliderValue() {
    return this.stateObj.attributes.volume_level * 100;
  }

  get showProgress() {
    return (
      (this.isPlaying || this.isPaused) &&
      'media_position' in this.stateObj.attributes &&
      'media_position_updated_at' in this.stateObj.attributes);
  }

  get currentProgress() {
    return (
      this.stateObj.attributes.media_position +
      ((Date.now() -
        new Date(this.stateObj.attributes.media_position_updated_at)) / 1000));
  }

  /* eslint-disable no-bitwise */

  get supportsPause() {
    return (this.stateObj.attributes.supported_media_commands & 1) !== 0;
  }

  get supportsVolumeSet() {
    return (this.stateObj.attributes.supported_media_commands & 4) !== 0;
  }

  get supportsVolumeMute() {
    return (this.stateObj.attributes.supported_media_commands & 8) !== 0;
  }

  get supportsPreviousTrack() {
    return (this.stateObj.attributes.supported_media_commands & 16) !== 0;
  }

  get supportsNextTrack() {
    return (this.stateObj.attributes.supported_media_commands & 32) !== 0;
  }

  get supportsTurnOn() {
    return (this.stateObj.attributes.supported_media_commands & 128) !== 0;
  }

  get supportsTurnOff() {
    return (this.stateObj.attributes.supported_media_commands & 256) !== 0;
  }

  get supportsPlayMedia() {
    return (this.stateObj.attributes.supported_media_commands & 512) !== 0;
  }

  get supportsVolumeButtons() {
    return (this.stateObj.attributes.supported_media_commands & 1024) !== 0;
  }

  get supportsPlay() {
    return (this.stateObj.attributes.supported_media_commands & 16384) !== 0;
  }

  /* eslint-enable no-bitwise */

  get primaryText() {
    return this.stateObj.attributes.media_title ||
           this.stateObj.stateDisplay;
  }

  get secondaryText() {
    if (this.isMusic) {
      return this.stateObj.attributes.media_artist;
    } else if (this.isTVShow) {
      let text = this.stateObj.attributes.media_series_title;

      if (this.stateObj.attributes.media_season) {
        text += ` S${this.stateObj.attributes.media_season}`;

        if (this.stateObj.attributes.media_episode) {
          text += `E${this.stateObj.attributes.media_episode}`;
        }
      }

      return text;
    } else if (this.stateObj.attributes.app_name) {
      return this.stateObj.attributes.app_name;
    }
    return '';
  }

  mediaPlayPause() {
    this.callService('media_play_pause');
  }

  nextTrack() {
    this.callService('media_next_track');
  }

  playbackControl() {
    this.callService('media_play_pause');
  }

  previousTrack() {
    this.callService('media_previous_track');
  }

  setVolume(volume) {
    this.callService('volume_set', { volume_level: volume });
  }

  togglePower() {
    if (this.isOff) {
      this.turnOn();
    } else {
      this.turnOff();
    }
  }

  turnOff() {
    this.callService('turn_off');
  }

  turnOn() {
    this.callService('turn_on');
  }

  volumeDown() {
    this.callService('volume_down');
  }

  volumeMute(mute) {
    if (!this.supportsVolumeMute) {
      throw new Error('Muting volume not supported');
    }
    this.callService('volume_mute', { is_volume_muted: mute });
  }

  volumeUp() {
    this.callService('volume_down');
  }

  // helper method

  callService(service, data) {
    const serviceData = data || {};
    serviceData.entity_id = this.stateObj.entityId;
    this.serviceActions.callService('media_player', service, serviceData);
  }
}
