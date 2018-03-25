$(document).ready(function() {
  console.log("document loaded");

  var socket = io.connect("http://localhost:3030");

  var coSection = document.querySelector('#coSection');
  var chat = document.querySelector('#chatSection');
  send.addEventListener('click', function(e) {
    e.preventDefault();
    var send = document.querySelector("#name").value;
    socket.emit('name', send);
    coSection.style.display = 'none';
    chat.style.display = 'block';
  })

  var sendMessage = document.querySelector('#sendMessage');


  sendMessage.addEventListener('click', function(e) {
    e.preventDefault();
    var textSection = document.querySelector('#textSection').value;
    var self = document.querySelector('#self').textContent;

    socket.emit('comments', textSection, self);

  })

  var sectionComments = document.querySelector('#commentsSection');

  socket.on("sendingComments", function(messages, name) {

    //Create Elements Section //
    var divComments = document.createElement('div');
    var br = document.createElement('br');
    var br2 = document.createElement('br');
    var pMessages = document.createElement('div');
    var pSender = document.createElement('div');
    // Adding Bootstrap Class to the main Div
    pSender.className = "sender";
    pMessages.className = "message";

    pMessages.innerHTML = messages;
    pSender.innerHTML = name;
    divComments.className = "col-md-6 offset-md-3 text-center msgArea";
    // Insert paragraph in the main div //
    sectionComments.append(divComments);

    divComments.append(pSender);
    // Back to line
    divComments.append(pMessages);
    divComments.append(br2);


    document.querySelector('#textSection').value = "";
    // Scroll Bar always at the bottom
    sectionComments.scrollTop = sectionComments.scrollHeight;

  })

  socket.on("allComments", function(messages, name) {

    //Create Elements Section //
    var divComments = document.createElement('div');
    var br = document.createElement('br');
    var br2 = document.createElement('br');
    var pMessages = document.createElement('div');
    var pSender = document.createElement('div');
    // Adding Bootstrap Class to the main Div
    pSender.className = "yourself";
    pMessages.className = "message";

    pMessages.innerHTML = messages;
    pSender.innerHTML = name;
    divComments.className = "col-md-6 offset-md-3 text-center msgArea";
    // Insert paragraph in the main div //
    sectionComments.append(divComments);

    divComments.append(pSender);
    // Back to line
    divComments.append(pMessages);
    divComments.append(br2);

    document.querySelector('#textSection').value = "";

    // Scroll Bar always at the bottom
    sectionComments.scrollTop = sectionComments.scrollHeight;

  })

  socket.on('selfConnected', function(message) {
    var self = document.querySelector('#self');
    self.innerHTML = message;
  })

  socket.on('user_connected', function(message) {
    var connected = document.querySelector('#connected');
    var self = document.querySelector('#self').textContent;
    for (var i = 0; i < message.length; i++) {
      if (message[i] == self) {
        message.splice(message.indexOf(self), 1);
      }
    }
    var res = message.join('</br>');
    connected.innerHTML = res;

  })

  socket.on('user_update', function(connected) {
    var co = document.querySelector('#connected');
    var dc = document.querySelector('#disconnected');
    var self = document.querySelector('#self').textContent;
    for (var i = 0; i < connected.length; i++) {
      if (connected[i] == self) {
        connected.splice(connected.indexOf(self), 1);
      }
    }
    var res = connected.join('</br>');
    co.innerHTML = res;
  })

  socket.on('user_retrieve', function(message) {
    var connected = document.querySelector('#connected');
    connected.innerHTML = message;
  })


  // Toggle SideBarConnexion
  $("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
  });

});