import Flux from '../../flux';
import isVoiceSupported from './stores/is-voice-supported-store';
import currentVoiceCommand from './stores/current-voice-command-store';
import * as _actions from './actions';
import * as _getters from './getters';

Flux.registerStores({currentVoiceCommand, isVoiceSupported});

export const actions = _actions;
export const getters = _getters;
