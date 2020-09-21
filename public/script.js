let socket = io()

$('#loginBox').show()
$('#chatBox').hide()

$('#btnStart').click(()=>{
	console.log("working")
	socket.emit('login', {
		username : $('#inputUsername').val()
	})
})

socket.on('logged_in', ()=>{
	$('#chatBox').show()
	$('#loginBox').hide()
	window.alert('login successful')
})

$('#btnSendMsg').click(()=>{
	console.log("working")
	socket.emit('msg_send', {
		to: $('#inpToUser').val(),
		msg: $('#inpNewMsg').val()
	})
})

socket.on('msg_rcvd', (data)=>{
	console.log(data.to)
	console.log(data.msg)

	$('#ulMsgs').append($('<li>').text(data.msg))
})