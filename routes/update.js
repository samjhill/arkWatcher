module.exports = function(app){

var cmd = require("cmd-exec").init();
var async = require("async");
var stripAnsi = require('strip-ansi');

/*
 * checkUpdate connects to SteamCMD and compares the versions we're given.
 * Returns true if the server is up-to-date
 * False otherwise
 */
var checkUpdate = function(){
  var returnVal;
  cmd.exec('arkmanager checkupdate')
  .then(function(result){
    var returnMsg = stripAnsi(result.message);
    returnMsg = decodeURIComponent(returnMsg);
    returnMsg = stripAnsi(returnMsg);
    returnMsg = returnMsg.trim();
    returnMsg = returnMsg.split('\n');
    returnMsg.splice(0,1); //remove the 'querying steam database for latest version...' message
    returnMsg.splice(returnMsg.length -1, 1); //remove the 'your server is up to date!' message
    returnMsg.forEach(function( property, i ){
       property = property.split(':');
       property[0] = property[0].toCamelCase();
       property.forEach(function( item, j ) {
          item = item.trim();
          property[j] = item;
       });
       var o = {};
       o[property[0]] = property[1];
       returnMsg[i] = o;
    });
    if (returnMsg[0].currentVersion === returnMsg[1].availableVersion) {
      isUpdated = true;
    }
    else {
      isUpdated = false;
    }
  })
  .fail(function(err){
    console.log(err.message);
  })
  .done(function(){
  });  
}

app.get('/isUpdated', function(req, res) {
  res.type('text/json');
  console.log('updated: ' + isUpdated);
  res.send(isUpdated);
});

/* Saves & updates the server
 * TODO: stream update console log or % complete to the client
 */
app.get('/update', function(req, res) {
  res.type('application/json');
  cmd.exec('arkmanager update --safe')
  .then(function(result){
   	var status = stripAnsi(result.message);
	status = status.trim();
	console.log(status);
	res.send(JSON.stringify(status));
  })
  .fail(function(err){
  })
  .done(function(){
    console.log('returned status of server update');
  });
});

/*
 * Load checkUpdate on server start and every 10 minutes so we can serve it more quickly to the client
 */
var isUpdated = checkUpdate();
setInterval(function() {
  checkUpdate();
}, 1000 * 10);

}