'use strict';

export function parseDateTime(datetime) {
  if(datetime.slice(-1) != 'Z')
	datetime += 'Z' //make sure it's UTC timezone
  return new Date(Date.parse(datetime));
}
