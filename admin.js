// CLIENT CODE FOR THE ADMIN PANEL

// Where's the websocket server?
const ws = new WebSocket('ws://localhost:8080');

// Inform user when server connects/disconnects
const connectMessage = document.getElementById('connected');
const disconnectMessage = document.getElementById('disconnected');
ws.onclose = function() {
	disconnectMessage.classList.add("visible");
  connectMessage.classList.remove("visible");
};
ws.onopen = function() {
	connectMessage.classList.add("visible");
  disconnectMessage.classList.remove("visible");
};
document.getElementById('close-connected').addEventListener('click', function(){
  connectMessage.classList.remove("visible");
})

// On submit, send a message to the server
document.forms[0].onsubmit = function () {
    var visible = document.getElementById('bug-message');
    var message = document.getElementById('bug-message');
    ws.send({bugVisible:visible.value, bugMessage:message.value});
    input.value = '';
    return false;
};
