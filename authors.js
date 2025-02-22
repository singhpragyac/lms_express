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
    var newAuthor = req.query.new_author;
    con.query( 'SELECT AUTHOR_ID, NAME, CREATED_ON, MODIFIED_ON FROM AUTHORS', function (err, dbRes, fields) {
        if (err) { throw err; }
        if(newAuthor !== '') {
            res.render('authors', { data : dbRes, new_author: newAuthor });
        } else {
            res.render('authors', { data : dbRes });
        }
    });
 });

 router.get('/:author_id([0-9]{1,4})', function(req, res){
    var auther_id = req.params.author_id;
    con.query( 'SELECT AUTHOR_ID, NAME, CREATED_ON, MODIFIED_ON FROM AUTHORS WHERE AUTHOR_ID = ?',
        [auther_id],
        function (err, dbRes, fields) {
        if (err) {
            res.render('wdw');
        }
        res.render('authors', { data : dbRes });
    });
 });

 router.get('/:author_id([0-9]{1,4})/update', function(req, res){
    var auther_id = req.params.author_id;
    con.query( 'SELECT AUTHOR_ID, NAME FROM AUTHORS WHERE AUTHOR_ID = ?',
        [auther_id],
        function (err, dbRes, fields) {
        if (err) {
            res.render('wdw');
        }
        if(dbRes. length === 0) {
            res.redirect('/authors');
        }
        res.render('author_update', { data : dbRes[0] });
    });
 });

 router.post('/:author_id([0-9]{1,4})/update/process', function(req, res){
    var f_author_id = req.body.author_id;
    var f_author_name = req.body.author_name;
    var q_author_id = req.params.author_id;
    if(f_author_id == q_author_id) {
        if (f_author_id !== '') {
            con.query( 'UPDATE AUTHORS SET NAME = ? WHERE AUTHOR_ID = ?', [f_author_name, f_author_id], function (err, dbRes, fields) {
                if (err) { throw err; }
            });
            res.redirect('/authors/'+ f_author_id);
        } else {
            res.redirect('/authors');
        }
    } else {
        res.redirect('/authors');
    }
 });

router.get('/add', function(req, res){
    var message1 = req.query.message;
    if(message1 !== null) {
        res.render('insert_authors', { message: message1 })
    } else {
        res.render('insert_authors')
    }
});

router.post('/add/process', function(req, res){
    var newAuthor = req.body.author_name;
    if (newAuthor !== '') {
        con.query( 'INSERT INTO AUTHORS (NAME) VALUES(?)', newAuthor, function (err, dbRes, fields) {
            if (err) { throw err; }
            //res.write('VALUE INSERTED');

        });
        res.redirect('/authors?new_author='+ req.body.author_name);
    } else {
        res.redirect('/authors/add?message=addition_failed');
    }
   /*
    var username=req.body.username;
    var email=req.body.email;
    var f={username: username,email:email};
    Form.create(f,function(err,newlyCreatedForm){
        if(err)
        {
            console.log(err);
        }else{
            res.redirect("/result");
        }
    });
    */
    //res.render('insert_authors')
    //res.redirect('/');
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