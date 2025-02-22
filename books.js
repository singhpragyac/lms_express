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
   con.query( 'SELECT BOOK_ID, TITLE, AUTHOR_ID, ISBN, PUBLICATION_YEAR, GENRE, CREATED_ON FROM BOOKS', function (err, dbRes, fields) {
      if (err) { throw err; }
      res.render('books', { data : dbRes });
  });
});

router.get('/:book_id([0-9]{1,4})', function(req, res){
   var book_id = req.params.book_id;
   con.query( 'SELECT BOOK_ID, TITLE, AUTHOR_ID, ISBN, PUBLICATION_YEAR, GENRE, CREATED_ON MODIFIED_ON FROM BOOKS WHERE BOOK_ID = ?',
       [book_id],
       function (err, dbRes, fields) {
       if (err) {throw err;}
       res.render('books', { data : dbRes });
   });
});

router.get('/:book_id([0-9]{1,4})/update', function(req, res){
   var book_id = req.params.book_id;
   con.query( 'SELECT BOOK_ID, TITLE, AUTHOR_ID, ISBN, PUBLICATION_YEAR, GENRE, CREATED_ON MODIFIED_ON FROM BOOKS WHERE BOOK_ID = ?',
       [book_id],function (err, dbRes, fields) {
         if (err) {throw err;}
       res.render('books', { data : dbRes });
   });
});

router.post('/:book_id([0-9]{1,4})/update/process', function(req, res){
   console.log(req.body);
   var new_title = req.body.title;
   var author_id = req.body.author_id;
   var new_isbn = req.body.isbn;
   var new_py = req.body.publication_year;
   var new_genre = req.body.genre;
      con.query( 'UPDATE BOOKS SET (TITLE,ISBN,PUBLICATION_YEAR,GENRE) VALUES (?,?,?,?) WHERE AUTHOR_ID = ?',
         [new_title, author_id, new_isbn, new_py,  new_genre],
         function (err, dbRes, fields) {
            if (err) { throw err; }
      });
      res.redirect('/books'+ author_id);

});



router.get('/add', function(req, res){
   res.render('insert_books');
});

 router.post('/add/process', function(req, res){
   console.log(req.body);
   var new_title = req.body.title;
   var author_id = req.body.author_id;
   var new_isbn = req.body.isbn;
   var new_py = req.body.publication_year;
   var new_genre = req.body.genre;
   if(new_title !=='' && author_id !== '' && new_isbn !== '' && new_py !== '' && new_genre !==''){
      con.query( 'INSERT INTO BOOKS (TITLE,AUTHOR_ID,ISBN,PUBLICATION_YEAR,GENRE) VALUES(?,?,?,?,?);',
         [new_title, 1, new_isbn, new_py,  new_genre],
         function (err, dbRes, fields) {
         
            if (err) { throw err; }
      });
      res.redirect('/books');
  }else {
      res.redirect('/books/add?=addition_failed')
  }
});

 router.get('/add/:book_id([0-9]{5})/update', function(req, res){
    res.send('Update book id: ' + req.params.book_id);
 });

 router.get('*', function(req, res){
    res.send('Sorry, this is an invalid URL. 404');
 });

module.exports = router;