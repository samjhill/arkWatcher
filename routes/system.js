module.exports = function(app){
var cmd = require("cmd-exec").init();
var async = require("async");
var stripAnsi = require('strip-ansi');
var os = require('os');

app.use(function(req, res, next) {
  next();
});

app.get('/systemLoad', function(req, res) {
  res.type('application/json');
  res.send(os.loadavg());
  console.log("successfully returned system load to a client");
});

}
