'use strict';

var moment = require('moment');

module.exports = {
  parseTime: function(timeString) {
    return moment(timeString, "HH:mm:ss DD-MM-YYYY");
  },

  relativeTime: function(timeString) {
    return this.parseTime(timeString).fromNow();    
  },

};
