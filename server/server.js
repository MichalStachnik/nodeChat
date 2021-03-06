const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')
const {makeMessage, makeLocationMessage} = require('./utils/message')


const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000
var app = express()
var server = http.createServer(app)
var io = socketIO(server)

app.use(express.static(publicPath))

io.on('connection', (socket) => {
  console.log('new user detected')
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })

  //sends to new users
  socket.emit('newMessage', makeMessage('michal', 'welcome to my chat app'))
  //sends to all other users
  socket.broadcast.emit('newMessage', makeMessage('michal', 'a new user has joined the chat'))

  //when server gets a createMessage from client, it sends the message along
  //to all the other users, adding the time
  socket.on('createMessage', (message, callback) => {
    console.log('createMessage listener', message)
    io.emit('newMessage', makeMessage(message.from, message.text))
    //lets us know that we got the message
    callback('this is from the server')

  })
  socket.on('sendLocation', (location) => {
    io.emit('newLocationMessage', makeLocationMessage('admin', location.latitude, location.longitude))
  })

})

server.listen(port, () => {
  console.log(`server is listening on ${port}`)
})
