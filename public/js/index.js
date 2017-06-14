var socket = io()
socket.on('connect', function(){
  console.log('connected to server')

  // socket.emit('createMessage', {
  //   from: 'michal',
  //   text: 'this is cool'
  // })
})

socket.on('disconnect', function(){
  console.log('no longer connected to server')
})

socket.on('newMessage', function(message){
  console.log('recieved newMessage', message)
})
