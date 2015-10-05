'use strict';
module.exports = function (str, opts){
function cmd_exec(cmd, args, cb_stdout, cb_end) {
  var spawn = require('child_process').spawn,
    child = spawn(cmd, args),
    me = this;
  me.exit = 0;  // Send a cb to set 1 when cmd exits
  child.stdout.on('data', function (data) { cb_stdout(me, data) });
  child.stdout.on('end', function () { cb_end(me) });
}

if(str == 'status'){
var status = new cmd_exec('arkmanager', ['status'], 
  function (me, data) {
   if(me.stdout == undefined){
      me.stdout = ''; 
   }
   if( data.toString()  ) {
      me.stdout += data.toString();}
   },
  function (me) {console.log(me.stdout); me.exit = 1;}
);
}

};
