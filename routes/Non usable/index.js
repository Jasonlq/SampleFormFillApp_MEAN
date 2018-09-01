var express = require("express");
var app     = express();
var path    = require("path");
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var things = require('./add_mongoose.js');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
mongoose.connect('mongodb://localhost/my_db');
app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.get('/about',function(req,res){
  res.sendFile(path.join(__dirname+'/about.html'));
});


app.get('/show',function(req,res){

  var Person = mongoose.model("Person", personSchema);
  Person.find(function(err, response){
    //console.log(response);
    //res.send(JSON.stringify(response));
    res.send(response);
});
});
/*
app.post('/res', urlencodedParser,function(req,res){
  var name_email=req.body.name
  var email=req.body.email
  res.send("Name is "+name_email+"And Email is "+email)

});
*/
app.listen(301);

console.log("Running at Port ");