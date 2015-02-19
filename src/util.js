'use strict';

export function parseDateTime(datetime) {
  var [time, date] = datetime.split(" ");
  var [hour, minute, second] = time.split(":");
  var [day, month, year] = date.split("-");

  return new Date(year, parseInt(month)-1, day, hour, minute, second);
}
