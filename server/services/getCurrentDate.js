const moment = require('moment-timezone');

var currentDate = moment.tz(moment(), 'Australia/Sydney');

module.exports.currentDate = currentDate;
