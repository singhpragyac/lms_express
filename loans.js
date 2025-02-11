var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.send('Show all loans');
 });

 router.get('/add', function(req, res){
    res.send('Add loan');
 });

 router.get('/add/:loan_id([0-9])', function(req, res){
    res.send('Show loan_id:'+req.params.loan_id);
 });

 router.get('/add/:loan_id([0-9])/update', function(req, res){
    res.send('Update loan_id:'+req.params.loan_id);
 });



//Other routes here which do not match
router.get('*', function(req, res){
    res.send('Sorry, this is an invalid URL. 404');
 });

//export this router to use in our index.js
module.exports = router;