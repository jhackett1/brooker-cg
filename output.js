// CLIENT CODE FOR THE OUTPUT

// Update the bug clock every second
setInterval(function(){
  var currentTime = new Date();
  // Fix the leading zeros
  var fixedHours = (currentTime.getHours() < 10)? "0"+currentTime.getHours() : currentTime.getHours();
  var fixedMinutes = (currentTime.getMinutes() < 10)? "0"+currentTime.getMinutes() : currentTime.getMinutes();
  // And output the results
  document.getElementById("time").innerHTML = fixedHours + ":" + fixedMinutes;
}, 1000);



// Handle Websockets client connection
var ws = new WebSocket('ws://localhost:8080');
// When the server sends a message, put it in the bug and log it
ws.onmessage = function(payload) {
  document.getElementById("bug-message").innerHTML = payload.data;
  console.log(payload.data);
};
