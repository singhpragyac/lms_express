var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.send('Show all authors');
 });

 router.get('/add', function(req, res){
    res.send('Add author');
 });

 router.get('/add/:author_id([0-9])', function(req, res){
    res.send('Show author_id:'+req.params.author_id);
 });

 router.get('/add/:author_id([0-9])/update', function(req, res){
    res.send('Update author_id:'+req.params.author_id);
 });


//Other routes here which do not match
router.get('*', function(req, res){
    res.send('Sorry, this is an invalid URL. 404');
 });

//export this router to use in our index.js
module.exports = router;