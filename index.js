var cmd = require("cmd-exec").init();
var async = require("async");
var express = require('express');
var stripAnsi = require('strip-ansi');
var auth = require('http-auth');
var basic = auth.basic({
	realm: "arkWatcher",
 	file: __dirname + "/data/users.htpasswd"
});
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Add headers
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://www.samhillmade.it:8080");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if (req.method === "OPTIONS") {
	res.status(204);
	res.send();
  }
  else {
	next();
  }
 
});

app.use(auth.connect(basic));

app.post('/authenticate', function(req, res){ // if they can reach this route, they're authenticated
    var response = {
 	status  : 200,
	success : 'Updated Successfully'
    }
    
    res.send(JSON.stringify(response));
});

//routes
var publicRoutes = require('./routes/public')(app);
var adminRoutes = require('./routes/admin')(app);
var systemRoutes = require('./routes/system')(app);
var systemRoutes = require('./routes/update')(app);

console.log('arkWatcher listening on port ' + (process.env.PORT || 4730));
app.listen(process.env.PORT || 4730);
