let socket = io()

$('#loginBox').show()
$('#chatBox').hide()

$('#btnStart').click(()=>{
	console.log("working")
	socket.emit('login', {
		username : $('#inputUsername').val(),
		password : $('#inpPass').val()
	})
})

socket.on('logged_in', ()=>{
	$('#chatBox').show()
	$('#loginBox').hide()
	$('#user').text($('#inputUsername').val()) 
	window.alert('login successful')
})

$('#btnSendMsg').click(()=>{
	console.log("working")
	//$('#ulMsgs').append($('<li>').text(`You : ${$('#inpNewMsg').val()}`))
	socket.emit('msg_send', {
		to: $('#inpToUser').val(),
		msg: $('#inpNewMsg').val()
	})
})

socket.on('msg_rcvd', (data)=>{
	console.log(data.from)
	console.log(data.to)
	console.log(data.msg)

	$('#ulMsgs').append($('<li>').text(`${data.from} : ${data.msg}`))
})

socket.on('login_failed', ()=>{
	window.alert('login failed retry')
	$('#loginBox').show()
	$('#chatBox').hide()
});