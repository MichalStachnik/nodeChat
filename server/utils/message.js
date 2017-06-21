var moment = require('moment')

var makeMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: moment().valueOf()
  }
}
var makeLocationMessage = (from, latitude, longitude) => {
  return {
    from,
    url: `https://www.google.com/maps?q=${latitude},${longitude}`,
    createdAt: moment().valueOf()
  }
}


module.exports = {makeMessage, makeLocationMessage}
