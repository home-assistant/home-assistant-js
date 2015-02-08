'use strict';

module.exports = {
  parseDateTime: function(datetime) {
    var parts = datetime.split(" ");
    var time = parts[0].split(":");
    var date = parts[1].split("-");

    return new Date(date[2], parseInt(date[1])-1, date[0], time[0], time[1], time[2]);
  },
};
