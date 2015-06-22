
export const isStreamingEvents = [
  'streamStatus',
  'isStreaming',
];

export const isSupported = [
  'streamStatus',
  'isSupported',
];

export const useStreaming = [
  'streamStatus',
  'useStreaming',
];

export const hasStreamingEventsError = [
  ['streamStatus', 'hasError'],
  hasError => !!hasError,
];
