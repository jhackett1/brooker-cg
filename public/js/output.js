// CLIENT CODE FOR THE OUTPUT

// Update the bug clock every second
function updateTime(){
  var currentTime = new Date();
  // Fix the leading zeros
  var fixedHours = (currentTime.getHours() < 10)? "0"+currentTime.getHours() : currentTime.getHours();
  var fixedMinutes = (currentTime.getMinutes() < 10)? "0"+currentTime.getMinutes() : currentTime.getMinutes();
  // And output the results
  document.getElementById("time").innerHTML = fixedHours + ":" + fixedMinutes;
}
updateTime();
setInterval(updateTime, 1000);

// Where is the socket server?
var socket = io("http://localhost:3000");

// Log server connection state
socket.on("disconnect", function() {
  	console.log("Disconnected from server");
});
socket.on("connect", function() {
  	console.log("You are connected to the server");
});


// When you get an instruction from the client, broadcast it on to all clients and log it
socket.on("instruction", function(message){
  // Let the console know you got something
  console.log("Instruction recieved from server: " + message);
  // Parse the message string into a JSON object
  var instruction = JSON.parse(message);

  // And act on it
  var bug = document.getElementById("bug");
  if (instruction.bugVisible) {
    bug.classList.add("visible");
  } else {
    bug.classList.remove("visible");
  }

  var venue = document.getElementById("venue");
  if (instruction.bugMessage !== venue.innerHTML) {
    venue.classList.add("hidden");
    setTimeout(function() {
      venue.innerHTML = instruction.bugMessage;
      venue.classList.remove("hidden");
    }, 500);
  }

  var holding = document.getElementById("holding");
  if (instruction.holdingVisible) {
    holding.classList.add("visible");
  } else {
    holding.classList.remove("visible");
  }

  var holdingMessage = document.getElementById("holding-message");
  if (instruction.holdingMessage !== holdingMessage.innerHTML) {
    holdingMessage.classList.add("hidden");
    setTimeout(function() {
      holdingMessage.innerHTML = instruction.holdingMessage;
      holdingMessage.classList.remove("hidden");
    }, 500);
  }

  var holdingSubMessage = document.getElementById("holding-submessage")
  if (instruction.holdingSubMessage !==  holdingSubMessage.innerHTML) {
    holdingSubMessage.classList.add("hidden");
    setTimeout(function() {
      holdingSubMessage.innerHTML = instruction.holdingSubMessage;
      holdingSubMessage.classList.remove("hidden");
    }, 500);
  }

  var lowerThird = document.getElementById("lower-third");
  if (instruction.lowerThirdVisible) {
    lowerThird.classList.add("visible");
  } else {
    lowerThird.classList.remove("visible");
  }

  var headline = document.getElementById("headline");
  if (instruction.headline !== headline.innerHTML) {
    headline.classList.add("hidden");
    setTimeout(function() {
      headline.innerHTML = instruction.headline;
      headline.classList.remove("hidden");
    }, 500);
  }

  var subheadline = document.getElementById("subheadline");
  if (instruction.subheadline !== subheadline.innerHTML) {
    subheadline.classList.add("hidden");
    setTimeout(function() {
      subheadline.innerHTML = instruction.subheadline;
      subheadline.classList.remove("hidden");
    }, 500);
  }

  var ticker = document.getElementById("ticker");
  if (instruction.tickerVisible) {
    ticker.classList.add("visible");
  } else {
    ticker.classList.remove("visible");
  }

  var trails = document.querySelector("#trails marquee");
  if (instruction.tickerTrails) {
    var newList = "";
    // For every array item, add it to the DOM as a li
    for (var I = 0; I < instruction.tickerTrails[0].length; I++)
    {
       trailList = "<li>" + instruction.tickerTrails[0][I] + "</li>";
       newList += trailList;
    }
    if (newList !== trails.innerHTML) {
      trails.classList.add("hidden");
      setTimeout(function() {
        trails.innerHTML = newList;
        trails.classList.remove("hidden");
      }, 500);
    }


    var scoreboard = document.getElementById("scoreboard");
    if (instruction.scoreboardVisible) {
      scoreboard.classList.add("visible");
    } else {
      scoreboard.classList.remove("visible");
    }

    var team1 = document.getElementById("team1");
    if (instruction.scoreboardTeam1 !== team1.innerHTML) {
      team1.classList.add("hidden");
      setTimeout(function() {
        team1.innerHTML = instruction.scoreboardTeam1;
        team1.classList.remove("hidden");
      }, 500);
    }

    var team2 = document.getElementById("team2");
    if (instruction.scoreboardTeam2 !== team2.innerHTML) {
      team2.classList.add("hidden");
      setTimeout(function() {
        team2.innerHTML = instruction.scoreboardTeam2;
        team2.classList.remove("hidden");
      }, 500);
    }

    var score1 = document.getElementById("score1");
    if (instruction.scoreboardScore1 !== score1.innerHTML) {
      score1.innerHTML = instruction.scoreboardScore1;
    }

    var score2 = document.getElementById("score2");
    if (instruction.scoreboardScore2 !== score2.innerHTML) {
        score2.innerHTML = instruction.scoreboardScore2;
    }











  }

})
