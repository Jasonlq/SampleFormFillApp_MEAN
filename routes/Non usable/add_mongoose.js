var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
mongoose.connect('mongodb://localhost/my_db');

var personSchema = mongoose.Schema({
   name: String,
   age: Number,
   nationality: String
});
var Person = mongoose.model("Person", personSchema)

router.post('/res',urlencodedParser, function(req, res){ 
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



module.exports=router