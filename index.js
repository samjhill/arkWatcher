'use strict';
var cmd = require("cmd-exec").init();
var async = require("async");

module.exports = function (str, opts){
   var calls = [];

   if(str == 'status'){
      //console.log('getting status...');
      var command = 'arkmanager status';
   }
   
   calls.push(function(callback){
      cmd.exec(command, function(err, res){
         if (err) {
           return callback(err.message);
         } else {
	   return callback(res.message);
         }
     }
  )});

  async.parallel(calls, function(err, result) {
    console.log('running');
    if (err)
        return console.log(err);
    return(JSON.stringify(result));
   });
};
