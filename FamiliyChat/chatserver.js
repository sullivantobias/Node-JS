var express = require('express');
var app = express();
var http = require("http");
var server = http.createServer(app);
app.use(express.static(__dirname));

app.get("/", function(req, res) {
  res.render('index.ejs');
})

var io = require('socket.io').listen(server);
var allClients = [];

io.sockets.on('connection', function(socket) {

  var res = allClients.join("</br>");
  socket.emit('user_retrieve', res);
  socket.on('name', function(name) {

    socket.pseudo = name;

    allClients.push(socket.pseudo)
    socket.broadcast.emit('user_connected', allClients);
    socket.emit('selfConnected', socket.pseudo);
  });

  socket.on('comments', function(comment, name) {

    socket.broadcast.emit('sendingComments', comment, name);
    socket.emit('allComments', comment, name);
  });

  socket.on('disconnect', function() {

    allClients.splice(allClients.indexOf(socket.pseudo), 1);
    socket.broadcast.emit('user_update', allClients);
  })
})

server.listen(3030);