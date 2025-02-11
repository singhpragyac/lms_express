var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
   res.send('show all books view');
});

router.get('/add', function(req, res){
    res.send('Add book');
 });

router.get('/add/:book_id([0-9])', function(req, res){
    res.send('View book id: ' + req.params.book_id);
 });

 router.get('/add/:book_id([0-9]{5})/update', function(req, res){
    res.send('Update book id: ' + req.params.book_id);
 });

 //Other routes here which do not match
 router.get('*', function(req, res){
    res.send('Sorry, this is an invalid URL. 404');
 });

//export this router to use in our index.js
module.exports = router;