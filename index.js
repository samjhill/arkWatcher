var cmd = require("cmd-exec").init();
var async = require("async");
var express = require('express');
var auth = require('http-auth');
var basic = auth.basic({
	realm: "arkWatcher",
 	file: __dirname + "/data/users.htpasswd"
});
var app = express();
app.use(auth.connect(basic));

var stripAnsi = require('strip-ansi');

//routes
var publicRoutes = require('./routes/public')(app);
var adminRoutes = require('./routes/admin')(app);

console.log('arkWatcher listening on port ' + (process.env.PORT || 4730));
app.listen(process.env.PORT || 4730);
