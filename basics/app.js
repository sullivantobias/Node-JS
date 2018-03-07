var http = require('http');
var url = require('url');
var query = require('querystring');

var server = http.createServer(function(req, res) {
  var pages = url.parse(req.url).pathname;
  var param = query.parse(url.parse(req.url).query);

  res.writeHead(200, {
    'content-type': 'text/html'
  });

  if (pages == "/") {
    res.write("You are on the home page");
  } else if (pages == "/player" && 'race' in param && 'classe' in param && 'weapons' in param) {
    var EventEmitter = require('events').EventEmitter;

    var jeu = new EventEmitter();
    jeu.on('creation', function(race, classe, weapons) {
      res.write("You have chosen : " + race +
        " ,  class : " + classe + " and the weapon : " + weapons);
    });
    res.write('Player Creation page </br>');
    jeu.emit('creation', param['race'], param['classe'], param['weapons']);
  } else {
    res.write("You are on a different page");
  }
  res.end();
})
server.listen(8080);