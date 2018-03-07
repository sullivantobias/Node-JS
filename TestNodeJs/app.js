var express = require('express');
var app = express();

app.get("/:name", function(req, res) {
  var name = req.params.name;
  if (isNaN(name)) {
    res.render('chambre.ejs', {
      Name: name
    })
  } else {
    res.send(404, "Error of parameter");
  }

});

app.listen(8080);