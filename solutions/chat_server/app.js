var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on("connection", function(socket) {
	console.log("User connected");
	socket.on("chat", function(chatInfo) {
		console.log("Chat received from: " + chatInfo.userName);
		console.log("Chat text is: " + chatInfo.chatText);

		socket.broadcast.emit("chat", chatInfo);
	});
});

io.on("disconnect", function() {
	console.log("Client has disconnected");
});

http.listen(3000);