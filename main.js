var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/comments', function(req, res) {
  var comments = fs.readFileSync('./comments.txt').toString().split('\n');
  res.render('index.ejs', {comments: comments});
});

app.get('/new', function(req, res) {
  res.render('new.ejs');
});

app.post('/new', function(req, res) {
  var newComment = req.body.comment;
  fs.appendFile("./comments.txt", "\n"+newComment);
  res.redirect('/comments');
})

app.listen(3000, function() {
  console.log('listening on 3000')
});
