var express = require("express");
var app     = express();
var path    = require("path");
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
//var things = require('./things.js');
//app.use('/things', things);

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

var express = require('express');
var mongoose = require('mongoose');
//var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
mongoose.connect('mongodb://localhost/my_db');

var personSchema = mongoose.Schema({
   name: String,
   age: Number,
   nationality: String
});
var Person = mongoose.model("Person", personSchema)

app.post('/res',urlencodedParser, function(req, res){ 
  var name_user=req.body.name
  var age_user=req.body.age
  var nat_user=req.body.nationality
  var newPerson = new Person({
         name:name_user,
         age: age_user,
         nationality:nat_user
      });
  newPerson.save(function(err, Person){
         if(err)
         {
          res.render('res',{user_name:name_user,user_age:age_user,user_nat:nat_user});
          }  //res.render('res', {message: "Database error", type: "error"});
         else
         {
            //res.render('res', {               message: "New person added", type: "success", person: personInfo});
            //res.render('res',{user_name:name_user,user_age:age_user,user_nat:nat_user}); 
             res.sendFile(path.join(__dirname+'/index.html'));
        }
      });
  //res.render('res',{user_name:name_user,user_age:age_user,user_nat:nat_user) 
});


app.get('/show',function(req,res){

  var Person = mongoose.model("Person", personSchema);
  Person.find(function(err, response){
    //console.log(response);
    //res.send(JSON.stringify(response));
    res.send(response);
});
});

//module.exports=router
/*
app.post('/res', urlencodedParser,function(req,res){
  var name_email=req.body.name
  var email=req.body.email
  res.send("Name is "+name_email+"And Email is "+email)

});
*/
app.listen(301);

console.log("Running at Port ");