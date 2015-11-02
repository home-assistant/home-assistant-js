
export const isValidating = [
  'authAttempt',
  'isValidating',
];

export const isInvalidAttempt = [
  'authAttempt',
  'isInvalid',
];

export const attemptErrorMessage = [
  'authAttempt',
  'errorMessage',
];

export const rememberAuth = [
  'rememberAuth',
];

export const attemptAuthInfo = [
  ['authAttempt', 'authToken'],
  ['authAttempt', 'host'],
  (authToken, host) => { return {authToken, host}; },
];

export const currentAuthToken = [
  'authCurrent',
  'authToken',
];

export const currentAuthInfo = [
  currentAuthToken,
  ['authCurrent', 'host'],
  (authToken, host) => { return {authToken, host}; },
];

export const authToken = [
  isValidating,
  ['authAttempt', 'authToken'],
  ['authCurrent', 'authToken'],
  (isValidating_, attemptToken_, currentToken_) => {
    return isValidating_ ? attemptToken_ : currentToken_;
  },
];

export const authInfo = [
  isValidating,
  attemptAuthInfo,
  currentAuthInfo,
  (isValidating_, attemptAuthInfo_, currentAuthInfo_) => {
    return isValidating_ ? attemptAuthInfo_ : currentAuthInfo_;
  },
];
