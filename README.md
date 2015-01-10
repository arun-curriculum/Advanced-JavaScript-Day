#Advanced JavaScript

##Installation
- Install [Node JS](http://nodejs.org/)
- Install [Nodemon](https://github.com/remy/nodemon)
- Install [Postgres.app](http://postgresapp.com/)

##Node Refresher

####JavaScript Runtime
- Node operates on the V8 Google Chrome JavaScript runtime.
- This runtime is what is responsible for interpreting the JavaScript and mapping it over to machine commands.
- Commands are executed through an architecture known as the "call stack." Currently-processing requests are part of the call stack, and come from the process queue.

####What is Node?
- Node JS is an interface that allows you to write server-side code in JavaScript.
- This interface provides the ability to handle requests and issue responses.
- It is asynchronous, and as a result, can be written in a way that will not block the call stack.
- Node is also a server that will allow your code to be accessible to the public and be able to issue responses for certain requests.

####First Server with Node

```
// server.js
var http = require("http");

function greet(req, res) {
	res.writeHead(200, {"Content-Type": "text/plain"});
	res.write("Hello World");
	res.end();
}

var server = http.createServer(greet);

server.listen(3000);
```

####Express JS
- Express is an API to Node JS that makes development more intuitive and quicker.
- Express allows us to easily set up routes that will trigger actions such as rendering pages.

####NPM and NPM Init
- NPM stands for Node Package Manager, and is a tool that allows us to easily download community-built Node packages.
- Initialize new Node project with NPM: `npm init`
- Install NPM packages: `npm install --save express`
- NPM works with package.json, which is a list of dependencies that can be installed on other computers and servers.

##Introduction to Web Sockets
- One of the most powerful uses for Node is its ability to handle seamless "real-time" experiences.
- Sockets are a way for a browser and server to communicate without the standard request-response cycle.
- Chat clients, real-time data feeds, and operational dashboards are some examples of where sockets have been used effectively.

##How it Basically Works
- A client makes an initial request out to the server and a "handshake" is created - AKA a connection has been established.
- This "handshake" is given a unique socket with a unique ID.
- Essentially this request never completes and remains open for the duration of the session.
- Every further request-response simulation is done via a manifestation of a JavaScript event.
- In a perfect world this is how things would always operate with sockets but certain factors such as browser incompatibility and more can interfere with a proper handshake. As a result, a more brute-force approach of "polling" may be required.

##Socket.io
- Socket.io is a library that essentially manages browser capabilities to connect a client with a server through web sockets in the most ideal way possible.
- It can switch between polling and sockets automatically and basically automate the handshake process.
- Socket.io works on the client and the server side to achieve seamless interaction.

##Socket-Based Chat Mechanism
- We will be building a chat application in Node using web sockets.
- We will use Express JS as the application framework.

####The Server Setup
- For this project we will need to import the Express and Socket.io modules into the project:

```
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
```

- To handle the initial handshake, Socket.io registers a `connection` event:

```
io.on('connection', function(socket) { });
```

- This is now a unique socket for this specific connection.
- Any events to this socket can easily be detected and dealt with:

```
socket.on('event', function(params) { });
```

- Any event can also be "emitted" from the socket if necessary:

```
io.emit('event', params);
```

####The Client Setup
- The client will also use Socket.io to handle the handshake and any further events.
- The first thing that will be needed is to create the handshake with the server:

```
var socket = io.connect("server_url or blank for current server");
```

- The client can also detect and respond to events:

```
socket.on('event', function(params) { });
```

- The client can also "emit" events:

```
socket.emit('event', params);
```

####Group Activity
- Get in groups of two or three.
- Given what we talked about, how do you think a real-time chat could work? Be as detailed as possible.
- I would encourage you to draw out a simple diagram.