var cmd = require("cmd-exec").init();
var async = require("async");
var express = require('express');
var app = express();
var stripAnsi = require('strip-ansi');

//routes
var adminRoutes = require('./routes/admin');
var publicRoutes = require('./routes/public');

app.use('/status', publicRoutes);

app.use('/log', adminRoutes);
app.use('/checkupdate', adminRoutes);

String.prototype.toCamelCase = function() {
      return this
          .replace(/\s(.)/g, function($1) { return $1.toUpperCase(); })
          .replace(/\s/g, '')
          .replace(/^(.)/, function($1) { return $1.toLowerCase(); });
};

console.log('arkWatcher listening on port ' + (process.env.PORT || 4730));
app.listen(process.env.PORT || 4730);
