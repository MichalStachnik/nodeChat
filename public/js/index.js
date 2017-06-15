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
  var listItem = $('<li></li>')
  listItem.text(`${message.from}: ${message.text}`)

  $('#messageList').append(listItem)
})


$('#form').on('submit', function(e){
  e.preventDefault()

  socket.emit('createMessage', {
    from: 'User',
    text: $('#input').val()
  }, function(){

  })
})
