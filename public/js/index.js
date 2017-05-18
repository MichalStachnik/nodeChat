var socket = io()
socket.on('connect', function(){
  console.log('connected to server')


})

socket.on('disconnect', function(){
  console.log('no longer connected to server')
})

socket.on('newMessage', function(message){
  console.log('recieved newMessage', message)
})
