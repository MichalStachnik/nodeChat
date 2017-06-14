var expect = require('expect')

var {generateMessage} = require('./message')

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    var from = 'michal'
    var text = 'my message'
    var message = generateMessage(from, text)

    expect(message.createdAt).toBeA('number')
    expect(message.text).toBeA('string')
    expect(message.from).toBeA('string')
  })
})
