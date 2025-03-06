var express = require('express');
var router = express.Router();
var mysql = require('mysql2');

var con = mysql.createConnection({
    host: "192.168.29.28",
    port: '3306',
    user: "root",
    password: "rootpassword",
    database: 'MY_DATABASE'
});



router.get('/', function(req, res){
   con.query('SELECT LOAN_ID, PATRON_ID, BOOK_ID,CHECKOUT_DATE,DUE_DATE,CREATED_ON FROM LOANS',function(err,dbRes,fields){
      if (err) { throw err; }  
      res.render('loans/loans', { data : dbRes });
   });

 });

 router.get('/:loan_id([0-9]{1,4})', function(req, res){
   var loan_id = req.params.loan_id
      con.query('SELECT LOAN_ID, PATRON_ID, BOOK_ID,CHECKOUT_DATE,DUE_DATE,CREATED_ON WHERE LOAN_ID = ?',
         [loan_id],
         function(err,dbRes,fields){
         if (err) { throw err; }  
         res.render('loans/loans', { data : dbRes });
      });
 });

 router.get('/:loan_id([0-9]{1,4})/update', function(req, res){
   var loan_id = req.params.loan_id
      con.query('SELECT LOAN_ID, PATRON_ID, BOOK_ID,CHECKOUT_DATE,DUE_DATE,CREATED_ON WHERE LOAN_ID = ?',
         [loan_id],
         function(err,dbRes,fields){
         if (err) { throw err; }  
         res.render('loans/loans', { data : dbRes });
      });
 });;

 router.post('/:loan_id([0-9]{1,4})/update/process', function(req, res){
   var book_id = req.params.book_id
   var patron_id = req.params.patron_id
      con.query('UPDATE LOAN SET BOOK_ID = ?, PATRON_ID = ? WHERE LOAN_ID = ?',
         [book_id,patron_id],
         function(err,dbRes,fields){
         if(err) {throw err;}
         res.redirect('/loans/'+loan_id);
      });
 });

 router.get('/add',function(req,res){
   res.render('loans/insert_loans');
 });

 router.post('/add/process',function(req,res){
   var book_id = req.body.book_id
   var patron_id = req.body.patron_id
   if(book_id !=='' && patron_id !=='') 
      con.query('INSERT INTO LOANS BOOK_ID = ?, PATRON_ID = ?',
         [book_id,patron_id],
         function(err,dbRes,fields){
            if(err){throw err;}
         res.redirect('/loans');
      });
 });

//Other routes here which do not match
router.get('*', function(req, res){
    res.send('Sorry, this is an invalid URL. 404');
 });

//export this router to use in our index.js
module.exports = router;