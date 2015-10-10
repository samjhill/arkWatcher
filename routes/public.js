var router = express.Router();

router.get('/status', function(req, res) {
  res.type('application/json');
  cmd.exec('arkmanager status')
  .then(function(result){
    var returnData = [];
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
       var o = {};
       o[property[0]] = property[1];
       returnData.push(o);
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