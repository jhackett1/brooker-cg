// CLIENT CODE FOR THE ADMIN PANEL

// Where is the socket server?
var socket = io("http://localhost:3000");

// Inform user when server connects/disconnects
const connectMessage = document.getElementById('connected');
const disconnectMessage = document.getElementById('disconnected');
socket.on("disconnect", function() {
  	disconnectMessage.classList.add("visible");
    connectMessage.classList.remove("visible");
});
socket.on("connect", function() {
  	connectMessage.classList.add("visible");
    disconnectMessage.classList.remove("visible");
});

// And make the success message closable
document.getElementById('close-connected').addEventListener('click', function(){
  connectMessage.classList.remove("visible");
})

// Get the form fields from the document and set as vars to be parsed into json
var bugVisibleValue = document.getElementById("bug-visible");
var bugMessageValue = document.getElementById("bug-message");

var lowerThirdVisibleValue = document.getElementById("lower-third-visible");
var headlineValue = document.getElementById("headline");
var subHeadlineValue = document.getElementById("subheadline");

var holdingVisibleValue = document.getElementById("holding-visible");
var sliceVisibleValue = document.getElementById("slice-visible");
var holdingMessageValue = document.getElementById("holding-message");
var holdingSubMessageValue = document.getElementById("holding-submessage");

var scoreboardVisibleValue = document.getElementById("scoreboard-visible");
var scoreboardTeam1Value = document.getElementById("scoreboard-team-1");
var scoreboardScore1Value = document.getElementById("scoreboard-score-1");
var scoreboardTeam2Value = document.getElementById("scoreboard-team-2");
var scoreboardScore2Value = document.getElementById("scoreboard-score-2");

var tickerVisibleValue = document.getElementById("ticker-visible");
var tickerTrails = document.getElementById("ticker-trails");

// On submit, send a message to the server
document.forms[0].onsubmit = function () {

  console.log("Sending instructions to server...");

  // Create a JS object
  var graphicsState = {
    bugVisible: bugVisibleValue.checked,
    bugMessage: bugMessageValue.value,
    lowerThirdVisible: lowerThirdVisibleValue.checked,
    headline: headlineValue.value,
    subheadline: subHeadlineValue.value,
    sliceVisible: sliceVisibleValue.checked,
    holdingVisible: holdingVisibleValue.checked,
    holdingMessage: holdingMessageValue.value,
    holdingSubMessage: holdingSubMessageValue.value,
    tickerVisible: tickerVisibleValue.checked,
    // Split the comma-separated input into an array
    tickerTrails: [tickerTrails.value.split(',')],
    // And the scoreboard
    scoreboardVisible: scoreboardVisibleValue.checked,
    scoreboardTeam1: scoreboardTeam1Value.value,
    scoreboardScore1: scoreboardScore1Value.value,
    scoreboardTeam2: scoreboardTeam2Value.value,
    scoreboardScore2: scoreboardScore2Value.value
  };

  instruction = JSON.stringify(graphicsState);

  socket.emit("instruction", instruction);
  console.log("Instruction sent: " + instruction);


  // Don't refresh the page
  return false;
};


// And upon loading, set the form elements to the current values sent by the server
// When you get an instruction from the client, broadcast it on to all clients and log it
socket.on("instruction", function(message){
  // Parse the message string into a JSON object
  var currentState = JSON.parse(message);
  // Set the form fields to the current state to remain in sync with the server
  bugVisibleValue.checked = currentState.bugVisible;
  bugMessageValue.value = currentState.bugMessage;

  lowerThirdVisibleValue.checked = currentState.lowerThirdVisible;
  headlineValue.value = currentState.headline;
  subHeadlineValue.value = currentState.subheadline;

  sliceVisibleValue.checked = currentState.sliceVisible;
  holdingVisibleValue.checked = currentState.holdingVisible;
  holdingMessageValue.value = currentState.holdingMessage;
  holdingSubMessageValue.value = currentState.holdingSubMessage;

  tickerVisibleValue.checked = currentState.tickerVisible;
  tickerTrails.value = currentState.tickerTrails;

  scoreboardVisibleValue.checked = currentState.scoreboardVisible;
  scoreboardTeam1Value.value = currentState.scoreboardTeam1;
  scoreboardScore1Value.value = currentState.scoreboardScore1;
  scoreboardTeam2Value.value = currentState.scoreboardTeam2;
  scoreboardScore2Value.value = currentState.scoreboardScore2;


})
