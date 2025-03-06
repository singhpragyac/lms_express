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
    con.query('SELECT PATRON_ID, NAME, ADDRESS, PHONE_NUMBER,CREATED_ON FROM PATRONS',function(err, dbRes, fields){
      if (err) { throw err; }
      res.render('patrons/patrons', { data : dbRes });
    });
 });

 router.get('/:patron_id([0-9]{1,4})', function(req, res){
   var patron_id = req.params.patron_id
   con.query('SELECT PATRON_ID, NAME, ADDRESS, PHONE_NUMBER,CREATED_ON FROM PATRONS WHERE PATRON_ID = ?',
      [patron_id],
      function(err, dbRes, fields){
     if (err) { throw err; }
     res.render('patrons/patrons', { data : dbRes });
   });
});

router.get('/:patron_id([0-9]{1,4})/update', function(req, res){
   var patron_id = req.params.patron_id;
   con.query('SELECT PATRON_ID, NAME, ADDRESS, PHONE_NUMBER,CREATED_ON FROM PATRONS WHERE PATRON_ID = ?',
      [patron_id],
      function(err, dbRes, fields){
     if (err) { throw err; }
     res.render('patrons/update_patrons', { data : dbRes[0] });
   });
});

router.post('/:patron_id([0-9]{1,4})/update/process', function(req, res){
   console.log(req.body);
   var patron_id = req.body.patron_id;
   var new_name = req.body.name;
   var new_address = req.body.address;
   var new_phn = req.body.phone_number;
   con.query('UPDATE PATRONS SET NAME = ?, ADDRESS = ?, PHONE_NUMBER = ? WHERE PATRON_ID = ?',
      [new_name,new_address,new_phn,patron_id],
      function(err, dbRes, fields){
     if (err) { throw err; }
     res.redirect('/patrons/'+patron_id);
   });
});

 router.get('/add', function(req, res){
    res.render('patrons/insert_patrons');
 });

 router.post('/add/process', function(req, res){
   // var new_patron_id = req.body.patron_id;
   var new_name = req.body.name;
   var new_address = req.body.address;
   var new_phn = req.body.phone_number;
   if(new_name !=='' && new_address !==''&& new_phn !=='')
      con.query( 'INSERT INTO PATRONS (NAME,ADDRESS,PHONE_NUMBER) VALUES(?,?,?);',
         [new_name, new_address, new_phn],
         function (err, dbRes, fields) {
            if (err) { throw err; }
      });
      res.redirect('/patrons')
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