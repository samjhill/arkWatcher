module.exports = function(app){
  var cmd = require('cmd-exec').init();
  var async = require("async");
  var stripAnsi = require('strip-ansi');

  app.get('/status', function(req, res) {
    res.type('application/json');
    cmd.exec('arkmanager status')
    .then(function(result){
      var returnData = {
          serverRunning: "",
          serverOnline: "",
          serverName: "",
          players: "",
          serverVersion: ""
      };
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
         returnData[property[0]] = property[1];
      });
      res.send(returnData);
    })
    .fail(function(err){
      console.log(err.message);
    })
    .done(function(){
      console.log("successfully returned status to a client");
    });
  });

  String.prototype.toCamelCase = function() {
      return this
          .replace(/\s(.)/g, function($1) { return $1.toUpperCase(); })
          .replace(/\s/g, '')
          .replace(/^(.)/, function($1) { return $1.toLowerCase(); });
  };

}
