'use strict';
var cmd = require("cmd-exec").init();
var async = require("async");

module.exports = function (str, opts){
   var results = "nothing yet";

   if(str == 'status'){
      var command = 'arkmanager status';
   }
   
   return async.series([
      function(callback){
         cmd.exec(command, function(err, res){
            if (err) {
              console.log(err);
              return callback(err);
            } else {
	      return callback(res);
            }
         })
     }
    ],
    function( res ){
      return res.message;
    });
};
