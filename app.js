var express = require('express');
var app = express();
var things = require('./things');
var books = require('./books');
var authors = require('./authors');
var patrons = require('./patrons');
var loans = require('./loans');
//const template = require( './templates/404.html' );

app.set('view engine', 'pug');
app.set('views','./views');

app.use(express.static('public'));


app.get('/', function(req, res){
   //res.send("Hello world!1qqq");
   res.render('first_view');
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