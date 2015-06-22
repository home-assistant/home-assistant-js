// boolean if passed in time is older than 60 seconds.
export default function isStaleTime(time) {
  return !time || (new Date()).getTime() - time > 60000;
}
