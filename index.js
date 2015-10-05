'use strict';
var cmd = require("cmd-exec").init();
var async = require("async");
var express = require('express');
var app = express();
var stripAnsi = require('strip-ansi');


app.get('/status', function(req, res) {
  res.type('text/json');
  cmd.exec('arkmanager status')
  .then(function(result){
    var status = stripAnsi(result.message);
    status = status.trim();
    status = status.split('\n');
    status.forEach(function( property, i ){
       property = property.split(':');
       property[0] = property[0].toCamelCase();
       property.forEach(function( item, j ) {
          item = item.trim();
          property[j] = item;
       });
       status[i] = property;
    });
    res.send(JSON.stringify(status));
  })
  .fail(function(err){
    console.log(err.message);
  })
  .done(function(){
    console.log("successfully returned status to a client");
  });
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

String.prototype.toCamelCase = function() {
      return this
          .replace(/\s(.)/g, function($1) { return $1.toUpperCase(); })
          .replace(/\s/g, '')
          .replace(/^(.)/, function($1) { return $1.toLowerCase(); });
};

console.log('listening on port ' + (process.env.PORT || 4730));
app.listen(process.env.PORT || 4730);
