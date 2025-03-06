var express = require('express');
var app = express();

var mysql = require('mysql2');
var con = mysql.createConnection({
   host: "192.168.29.28",
   port: '3306',
   user: "root",
   password: "rootpassword",
   database: 'MY_DATABASE'
 });


var bodyParser = require('body-parser');
//var multer = require('multer');
//var upload = multer();

var things = require('./things');
var books = require('./books');
var authors = require('./authors');
var patrons = require('./patrons');
var loans = require('./loans');


app.use('/static', express.static('static'));
app.set('view engine', 'hbs');
app.set('views','./views');
//app.set('views','./views/patrons');

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

app.get('/', function(req, res){
   res.render('home');
});

let demo_data = {
   name: 'Rohan',
   age: 26
};

let projects = {
   name: 'Rahul',
   skills: ['Data Mining', 'BlockChain Dev', 'node.js']
}
/*
app.get('/authors', function(req, res){
   //res.send("Hello world!1qqq");
 // res.render('form');
   // res.render('demo');
   //res.render('dynamic',{demo :demo_data})
   //res.render('projects',{projects : projects});
      //  con.query( 'SELECT BOOK_ID, TITLE, AUTHOR_ID, ISBN,PUBLICATION_YEAR,GENRE,STATUS,CREATED_ON,MODIFIED_ON FROM BOOKS', 
      //    function (err, dbRes, fields) {
      //    if (err) { throw err; }
      //    //console.log(dbRes);
      //    res.render('book', { data : dbRes });
      // });
   //  con.query( 'SELECT PATRON_ID, NAME, ADDRESS, PHONE_NUMBER,CREATED_ON,MODIFIED_ON FROM PATRONS',
   //     function (err, dbRes, fields) {
   //    if (err) { throw err; }
   //    res.render('patrons', { data : dbRes });
   //   });
     con.query( 'SELECT AUTHOR_ID, NAME, CREATED_ON, MODIFIED_ON FROM AUTHORS',
       function (err, dbRes, fields) {
      if (err) { throw err; }
      res.render('authors', { data : dbRes });
       });
      //  con.query( 'INSERT INTO AUTHORS (NAME) VALUES(?)', fields.author_name, function (err, dbRes, fields) {
      //    if (err) { throw err; }
      //    res.write('VALUE INSERTED');
      //  });
   // con.query( 'SELECT LOAN_ID, BOOK_ID, PATRON_ID, CHECKOUT_DATE, DUE_DATE, CREATED_ON, MODIFIED_ON FROM LOANS', function (err, dbRes, fields) {
   //    if (err) { throw err; }
   //    res.render('loans', { data : dbRes });
   // });
});
*/
/*
app.get('/authors/add', function(req, res){
   // con.query( 'INSERT INTO AUTHORS (NAME) VALUES', (author_name), function (err, dbRes, fields) {
   //       if (err) { throw err; }
   //       res.render('insert_authors',{data : dbRes});
   //     });
   res.render('insert_authors')
});
*/

app.post('/test2', function(req, res){
   console.log(req.body);
   res.send("recieved your request!");
});

app.get('/abc/:id', function(req, res){
   res.send('The id you specified is ' + req.params.id);
});

app.get('/things/:name/:id', function(req, res) {
   res.send('id: ' + req.params.id + ' and name: ' + req.params.name);
});

app.get('/things/:id([0-9]{5})', function(req, res){
   res.send('id: ' + req.params.id);
});

/*
app.post('/hello', function(req, res){
   res.send("You just called the post method at '/hello'!\n");
});
*/

app.use('/things', things);

app.use('/books', books);

app.use('/authors', authors);

app.use('/patrons', patrons);

app.use('/loans', loans);
/*
app.all('/test', function(req, res){
   res.send("HTTP method doesn't have any effect on this route!");
});
*/

//Other routes here which do not match
app.get('*', function(req, res){
   res.send('Sorry, this is an invalid URL. 404');
   //console.log( template.render());
});


app.listen(3000);