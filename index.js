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
app.use(auth.connect(basic));

//routes
var publicRoutes = require('./routes/public')(app);
var adminRoutes = require('./routes/admin')(app);

console.log('arkWatcher listening on port ' + (process.env.PORT || 4730));
app.listen(process.env.PORT || 4730);
