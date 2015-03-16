'use strict';

export function parseDateTime(datetime) {
  return new Date(Date.parse(datetime));
}
