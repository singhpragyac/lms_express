var express = require('express');
var router = express.Router();

//Middleware function to log request protocol
router.use('/', function(req, res, next){
   console.log("A request for things received at " + Date.now());
   next();
});

router.get('/', function(req, res, next){
   res.send('GET route on things.this is /');
   next();
});
   
router.use('/', function(req, res){
   console.log('End');
});

router.get('/test', function(req, res){
   res.send('POST route on things.');
});


//Other routes here which do not match
router.get('*', function(req, res){
    res.send('Sorry, this is an invalid URL. 404');
 });

//export this router to use in our index.js
module.exports = router;