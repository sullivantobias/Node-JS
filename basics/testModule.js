var http = require('http');
var show = require('./module');
var markdown = require('markdown').markdown;
console.log(markdown.toHTML('Un paragraphe en **markdown** !'));

var server = http.createServer(function(req, res) {

  res.writeHead(200, {
    'content-type': 'text/html'
  });

  show.direBonjour();
  show.direByeBye();

  res.end();
})
server.listen(8080);