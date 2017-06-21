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
  // console.log('recieved newMessage', message)
  //
  var formattedTime = moment(message.createdAt).format('h:mm a')
  // var listItem = $('<li></li>')
  // listItem.text(`${message.from} ${formattedTime}: ${message.text}`)
  //
  // $('#messageList').append(listItem)

  var template = $('#message-template').html()
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  })
  $('#messageList').append(html)
})

socket.on('newLocationMessage', function(message){
  var formattedTime = moment(message.createdAt).format('h:mm a')
  // var listItem = $('<li></li>')
  // var anchor = $('<a target="_blank">My location</a>')
  // listItem.text(`${message.from} ${formattedTime}: `)
  // anchor.attr('href', message.url)
  // listItem.append(anchor)
  // $('#messageList').append(listItem)
  var template = $('#location-template').html()
  var html = Mustache.render(template, {
    from: message.from,
    createdAt: formattedTime,
    url: message.url
  })
  $('#messageList').append(html)
})

$('#form').on('submit', function(e){
  e.preventDefault()
  socket.emit('createMessage', {
    from: 'User',
    text: $('#input').val()
  }, function(){
  })
})

var locationButton = $('#location')
locationButton.on('click', function(){
  if(!navigator.geolocation){
    return alert("your broweser doesn't support geolocation")
  }
  navigator.geolocation.getCurrentPosition(function(position){
    socket.emit('sendLocation', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  }, function(error){
    alert('unable to fetch location', error)
  })
})
