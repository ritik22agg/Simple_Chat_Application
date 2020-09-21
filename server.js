const http = require('http')
const express = require('express');

const app = express()
const socketio = require('socket.io')
const server = http.createServer(app)
app.use('/', express.static(__dirname + '/public/'))
const io = socketio(server)

let users = {

}

io.on('connection', (socket)=>{
	console.log('connected with socket id = ', socket.id)
	socket.on('login', (data)=>{

		if(users[data.username]){
			if(users[data.username] == data.password){
				socket.join(data.username)
				socket.emit('logged_in')
			}else{
				socket.emit('login_failed')
			}

		}else{
			users[data.username] = data.password
			socket.join(data.username)
			socket.emit('logged_in')
		}
		
	})

	socket.on('msg_send', (data)=>{
		console.log(data.to)
		console.log(data.msg)

		if(data.to){
			io.to(data.to).emit('msg_rcvd', data)
		}else{
			socket.broadcast.emit('msg_rcvd', data)
		}
	})


})


server.listen(5555, ()=>{
	console.log("Server started at http://localhost:5555 ")
})