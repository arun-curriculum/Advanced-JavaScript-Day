#Advanced JavaScript

##Installation
- Install [Node JS](http://nodejs.org/)
- Install [Nodemon](https://github.com/remy/nodemon)

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

- You can also emit events to all sockets connected except for yours by using `broadcast`:

```
socket.broadcast.emit('event', params);
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

##Group Activity
- Get in groups of two or three.
- Given what we talked about, how do you think a real-time chat could work? Be as detailed as possible.
- I would encourage you to draw out a simple diagram.

##Front-End Templating and Handlebars
- Handlebars is a front-end templating framework.
- Think of EJS or ERB, for the front end.
- Basically, you will need a templating framework any time you have a collection of data and you want to display it in some specified way.
- Handlebars is really good at taking JSON data and displaying it.

####Setup
- Download the [Handlebars library](http://handlebarsjs.com/).
- Download [JSONView Chrome plugin](https://chrome.google.com/webstore/detail/jsonview/chklaanhfefbnpoihckbnefhakgolnmc?hl=en).

####AJAX Refresher
- For today's lesson we will be using jQuery to handle the AJAX calls.
- AJAX is a way to send and receive data from the server asynchronously from the page load.
- The syntax for jQuery AJAX is as follows:

```
$.ajax({
	url: "YOUR ENDPOINT HERE",
	type: "GET",
	success: function(data) { },
	error: function(jqXHR, textStatus, errorThrown) { }
});
```

####How to Use Handlebars
- Handlebars templates are handled through `<script>` tags, which allow them to be ignored while rendering the page:

```
<script id="my-template" type="text/x-handlebars-template">
```

- You can write any normal HTML here, but you can also write Handlebars-specific code:

```
<script id="my-template" type="text/x-handlebars-template">
	<div class="entry">
		<h1>{{title}}</h1>
		<div class="body">
			{{body}}
		</div>
	</div>
</script>
```

- The curly code is essentially keys to a JSON object.
- If you need to, you can also loop through an array of JSON objects to produce very dynamic templates. You will do this today. Here is an example from the docs on how this can be done through helpers:

```
<h1>Comments</h1>

<div id="comments">
	{{#each comments}}
		<h2><a href="/posts/{{id}}">{{title}}</a></h2>
		<div>{{body}}</div>
	{{/each}}
</div>
```

- This example assumes that `comments` is an array of JSON objects.

- Before a template is used however, it must be first "compiled":

```
var source   = $("#my-template").html();
var template = Handlebars.compile(source);
```

- The function `Handlebars.compile` returns a function that can be passed JSON data as an argument.
- This resulting function returns HTML after the JSON data is processed into it.
- You can then apply your template anywhere you need to:

```
var jsonData = {
	title: "My New Post",
	body: "This is my first post!"
};

var template_html = template(jsonData);
$("#some-div").html(template_html);
```

##In-Class Lab
- Make a GET request out to `http://daretodiscover.net/wines` to retrieve wine data.
- Use Handlebars to create a simple template for each JSON object returned.

##Let's Build the Chat App!
- Partner up with a friend for this one.
- Let's apply what we learned about sockets and front-end templating to create a simple group chat application.
- The chat bubbles should be Handlebars templates.

##Modular Code
- Large code bases can get tough to maintain after a while.
- Writing code in a way that is essentially a collection of functions that do certain actions is much easier to work with later on.
- Modular code is also easy to test because you can call up various functions individually.
- Node apps are generally built-in a modular fashion, and this practice is built in.
- On the client side however there is not a built-in method to do this.
- There are two tools that are commonly used to create modular JS on the client - Require JS and Browserify.

##Introduction to Browserify
- In Node we define modules with `module.exports`.
- By using Browserify we can use these Node modules on the client side.
- Here is a basic example:

####multiply.js

```
module.exports = function (a, b) {
	return a * b;
};
```

####square.js

```
var multiply = require('./multiply');

module.exports = function (n) {
	return multiply(n, n);
};
```

####index.js

```
var square = require('./square');

console.log(square(125)); //=> 15625
```

####Compile Modules

```
browserify index.js -o bundle.js
```

- You can also use NPM modules on the client side:

####hasher.js

```
// Use a Node.js core library
var url = require('url');

module.exports = function(myUrl) {
	var parsed = url.parse(myUrl);
	return parsed.hash;
};
```

####app.js

```
var hasher = require('./hasher.js');
var hash = hasher(window.location);
console.log(hash);
```

##In-Class Lab
- We will now put into practice a modular code structure on an actual code base.
- The source files for this project can be found in the [book_manager](book_manager/) folder.
- Your task is to use NPM's `module.exports` to modularize the codebase of the book manager system.
- Even though it's a little much, try separating the code into 5 separate modules for each action - show all books, show a specific book in the edit view, submit edits, delete book, add a new book.
- Package your modules into a single file with Browserify to be used in your "production" product.
- Bonus: Use a NPM module to enhance the project in some way. An example may be to use the [url module](https://www.npmjs.com/package/url) to create a simple application router.