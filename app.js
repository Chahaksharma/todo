var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://<dbuser>:<dbpassword>@ds149960.mlab.com:49960/todo'); // available on your mlab account

var todoSchema = new mongoose.Schema({
  item: String
});

var todo = mongoose.model('todo',todoSchema);
/*var item1 = todo({item: 'kissi ks'}).save(function(err){
  if(err) throw err;
  console.log('Item saved');
});*/

app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended: true}));

var todoList = [
  'do something good',
  'breathe',
  'drink water'
];

app.get('/', function(req, res){
    todo.find({}, function(err, data){
      if(err) throw err;
      res.render('index.ejs', {todos: data});

    });
});
app.get('/delete:id?', function(req, res){
  var i = req.param('id');
  //console.log(i);
  todo.remove({_id: req.param('id')}, function(err){
    if(err) console.log('error');
    else
    {
      res.redirect('/');
    }
  });
});
app.post('/todo', function(req, res){
    //todoList.push(item);
    var item1 = todo(req.body).save(function(err){
    if(err) throw err;
    //console.log('Item saved');
    res.redirect('/');
  });
});



app.get('*', function(req, res){
  res.send('<h1> Invalid Page! </h1>');
});


app.listen(3000, function(){
  console.log('server started at port 3000');
});
