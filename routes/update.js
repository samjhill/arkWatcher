module.exports = function(app){

var cmd = require("cmd-exec").init();
var async = require("async");
var stripAnsi = require('strip-ansi');
var spawn = require('child_process').spawn;

/*
 * checkUpdate connects to SteamCMD and compares the versions we're given.
 * Returns true if the server is up-to-date
 * False otherwise
 */
var checkUpdate = function(){
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
  var toReturn;
  
  var proc = spawn('arkmanager', ['update', '--safe']);
  proc.stdout.on('data', function(data){
    var output = data.toString();
    console.log(output);
    //if server is already updated
    if (output.indexOf('Your server is already up to date!') !== -1) {
      toReturn = 'Server is already up-to-date.';
    }
    
    //find update progress
    if (output.indexOf('progress:') !== -1) {
      var startPos = output.indexOf('progress:') + 10; //get the value right after progress:_, which should be a number
      var endPos = output.indexOf(' (', startPos); // find the end of this value, which is signified by space + (
      console.log(output.substring(startPos, endPos).trim());
      updatePercent = output.substring(startPos, endPos).trim();
      toReturn = 'Updating...';
    }
  });
  
  proc.stderr.on('data', function(data){
    console.log(data);
  });
  
  proc.on('close', function (code, signal) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(JSON.stringify(toReturn));
    res.end();
  });
  
  //// for testing
  //updatePercent = 0;
  //setInterval(function(){
  //            if(updatePercent != 100){
  //              updatePercent += 1;
  //            }
  //  }, 1000);
  //res.send(JSON.stringify('Updating...'));
});

/*
 * Returns progress of an update
 */
app.get('/updateProgress', function(req, res){
    console.log('updatePercent: ' + updatePercent);
    res.send(JSON.stringify(updatePercent));
});

/*
 * Load checkUpdate on server start and every 5 minutes so we can serve it more quickly to the client
 */
var isUpdated = checkUpdate();
var updatePercent = 0.00;

setInterval(function() {
  checkUpdate();
}, 1000 * 60 * 5);

}