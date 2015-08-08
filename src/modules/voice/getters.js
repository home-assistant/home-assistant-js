
export const isVoiceSupported = ['isVoiceSupported'];

export const isListening = [
  'currentVoiceCommand',
  'isListening',
];

export const isTransmitting = [
  'currentVoiceCommand',
  'isTransmitting',
];

export const interimTranscript = [
  'currentVoiceCommand',
  'interimTranscript',
];

export const finalTranscript = [
  'currentVoiceCommand',
  'finalTranscript',
];

// interimTranscript contains all text from finalTranscript too
// this getter cuts that off
export const extraInterimTranscript = [
  interimTranscript,
  finalTranscript,
  (interimTranscript_, finalTranscript_) => {
    return interimTranscript_.slice(finalTranscript_.length);
  },
];
