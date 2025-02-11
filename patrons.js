var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.send('show all patrons');
 });

 router.get('/add', function(req, res){
    res.send('add patron');
 });

 router.get('/add/:patron_id([0-9])', function(req, res){
    res.send('show patron_id:'+req.params.patron_id);
 });

 router.get('/add/:patron_id([0-9])/update', function(req, res){
    res.send('update patron_id:'+req.params.patron_id);
 });


//Other routes here which do not match
router.get('*', function(req, res){
    res.send('Sorry, this is an invalid URL. 404');
 });

//export this router to use in our index.js
module.exports = router;