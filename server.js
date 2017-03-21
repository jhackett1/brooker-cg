var express = require("express");
var http = require("http");
var fs = require("fs");

// Create a new express app, build a HTTP server around that app, then build sockets.io functionality into that server
var app = express();
var server = http.createServer(app).listen(3000);
var io = require("socket.io")(server);

// Serve files in the public directory
app.use(express.static('./public'));

// Log this message when server runs
console.log("Socket server running on port 3000. Ctrl+C to exit.");

// Where's the data file which stores persistent graphics state?
var dataFile = "graphics.json";

// When connected, do these things
io.on("connection", function(socket){

  console.log("New client connected");

  // When a new client connects, read the data file and send the saved graphics state out
  fs.readFile(dataFile, "utf8", function(err, data) {
  	socket.emit('instruction', data);
  });

  // Send this message to each new client
  socket.emit("message", "You are connected to the Brooker CG server");
  // When you get an instruction from the client, broadcast it on to all clients and log it
  socket.on("instruction", function(message){
    socket.broadcast.emit("instruction", message);
    console.log("Instruction recieved");
    fs.writeFile(dataFile, message);
  })
})
