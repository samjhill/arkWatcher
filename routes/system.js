module.exports = function(app){
var cmd = require("cmd-exec").init();
var async = require("async");
var stripAnsi = require('strip-ansi');
var usage = require('usage');

app.use(function(req, res, next) {
  next();
});

app.get('/systemLoad', function(req, res) {
  res.type('application/json');
  cmd.exec('pidof ShooterGameServer')
  .then(function(result){
    console.log(result.message);
    var pid = stripAnsi(result.message);
    pid = pid.trim();
    usage.lookup(pid, function(err, result){
        console.log(result);
    	res.send(result);
    });
  })
  .fail(function(err){
    console.log(err.message);
  })
  .done(function(){
    console.log("successfully returned system load to a client");
  });
});

}
