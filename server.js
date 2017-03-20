// SERVERSIDE CODE

// Get the WS module for the websockets server
var WebSocket = require("ws");

// And create a websockets server running on port 8080
var wss = new WebSocket.Server({ port: 8080 });

// When the script runs, let the user know the server is listening
console.log("WebSockets server running on port 8080. Ctrl+C to quit.");

// While the server is running, send a generic welcome message and log incoming messages from clients
wss.on('connection', function connection(ws) {


  ws.on("message", function(message) {
        console.log('Instruction recieved from controller: %s', message);
			wss.clients.forEach(function(client) {
				client.send(message);
			});
	});



});
