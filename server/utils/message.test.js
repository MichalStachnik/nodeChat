var expect = require('expect')

var {makeMessage, makeLocationMessage} = require('./message')

describe('makeMessage', () => {
  it('should generate the correct message object', () => {
    var from = 'michal'
    var text = 'my message'
    var message = generateMessage(from, text)

    expect(message.createdAt).toBeA('number')
    expect(message.text).toBeA('string')
    expect(message.from).toBeA('string')
  })
})

describe('makeLocationMessage', () => {
  it('should generate correct location object', () => {
    var from = 'michal'
    var latitude = 15
    var longitude = 13
    var url = 'https://www.google.com/maps/q=15,19'

    var message = makeLocationMessage(from, latitude, longitude)

    expect(message.createdAt).toBeA('number')
    expect(message).toInclude({from, url})
  })
})
