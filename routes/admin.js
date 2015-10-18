module.exports = function(app){
var cmd = require("cmd-exec").init();
var async = require("async");
var stripAnsi = require('strip-ansi');

app.use(function(req, res, next) {
  next();
});

app.get('/log', function(req, res) {
  res.type('text/json');
  cmd.exec('cat /var/log/arktools/arkserver.log')
  .then(function(result){
    var logs = stripAnsi(result.message);
    logs = decodeURIComponent(logs);
    logs = logs.replace(/\\/g,"/");
    logs = logs.split('\n');
    res.send(JSON.stringify(logs));
  })
  .fail(function(err){
    console.log(err.message);
  })
  .done(function(){
    console.log("successfully returned log to a client");
  });
});

app.post('/stop', function(req, res) {
  res.type('application/json');
  cmd.exec('arkmanager stop')
  .then(function(result){
    var status = stripAnsi(result.message);
    status = status.trim();
    if(status === "The server is already stopped"){
	res.status(300);
	res.send(JSON.stringify(status));
    }
    else {
        res.status(201);
	res.send(JSON.stringify('The server has been stopped'));
    }
  })
  .fail(function(err){
    console.log(err.message);
  })
  .done(function(){
    console.log("returned status of server stop");
  });
});

app.post('/start', function(req, res) {
  res.type('application/json');
  cmd.exec('arkmanager start')
  .then(function(result){
    var status = stripAnsi(result.message);
    status = status.trim();
    if(status === "The server is already running"){
	res.status(300);
	res.send(JSON.stringify(status));
    }
    else {
    	res.status(201);
	res.send(JSON.stringify('The server is now up'));
    }
  })
  .fail(function(err){
    console.log(err.message);
  })
  .done(function(){
    console.log("returned status of server start");
  });
});

app.post('/command', function(req, res) {
  res.type('application/json');
  cmd.exec('arkmanager rconcmd "' + req.body.command + '"' )
  .then(function(result){
    var status = stripAnsi(result.message);
    status = status.trim();
    if(status === "Server received, But no response!!") {
    	res.status(300);
	res.send(JSON.stringify("No response from server. This doesn't necessarily mean the command failed; there's just no response."));
    }
    else {
    	res.send(JSON.stringify(status));
    }
  })
  .fail(function(err){
    console.log(err.message);
  })
  .done(function(){
    console.log("returned status of running command");
  });
});
}
