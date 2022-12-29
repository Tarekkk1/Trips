var express = require('express');
var path = require('path');
const { debugPort, nextTick } = require('process');
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({ extended: true}));
var MongoClient=require('mongodb').MongoClient;
const session =require('express-session');
// const passport =require('passport');
const { ftruncate } = require('fs');
const { render } = require('ejs');
// var cookiparser=require('cookie-parser');
// var flash =require("connect-flash");
const { response } = require('express');
const { assert } = require('console');
const alert =require('alert');
const PORT = process.env.PORT || 3030;
//const e = require('connect-flash');
app.use(session({
   secret:"our secret.",
   cookie:{maxAge:600000},
   resave:false,
   saveUninitialized:false,
   log:false,
   loginid:""
}));
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(flash());
const url = 'mongodb://127.0.0.1:27017';
app.get('/',(req,res)=>{res.render('login');
});app.get('/login',(req,res)=>{res.render('login');
});
app.post('/',function(req,res){
   res.redirect('home');
});


app.get("/searchresults",function(req,res){
  if (req.session.log==true)
    rres.render('searchresults',{trips:new Array("error")});
    else {res.render('login');
    }
 })
app.get("/search",function(req,res){
  if (req.session.log==true)
  res.render('searchresults',{trips:new Array("error")});
    else {res.render('login');
    }
 })
app.post ('/search',function(req,res){
const x = req.body.Search;
 const search =x.toLowerCase();
 var returned=new Array();

 const directions = ["paris", "santorini", "rome","bali","annapurna","inca"];
 
 directions.forEach(direction=>{
  if (direction.includes(search))
  returned.push(direction);


  
});if (returned.length>0)
res.render('searchresults',{trips:returned}); else  res.render('searchresults',{trips:new Array("error")});


});
app.post('/santoriniwanttogo',function(req,res){
   var trip=new Array();
MongoClient.connect(url,function(err,client){
   if (err)throw err;
   var db=client.db('myDB');
   const collect=db.collection("myCollection");
   collect.findOne({"username":req.session.loginid},function(err,result){
    if (err)console.log(err);
else {    if ((result.trips).includes("santorini"))    {
  
  alert("santorini is already in your wanttogo list !");
  res.render('santorini');

}
else {  
    result.trips[result.trips.length]="santorini";
    collect.updateOne({"username":req.session.loginid},{$set:{"trips":result.trips}},function(err,result){
      if (err)console.log(err);
    });

    res.render('santorini');


  }
}  
  });
  });
});
app.post('/pariswanttogo',function(req,res){
   var trip=new Array();
   MongoClient.connect(url,function(err,client){
      if (err)throw err;
      var db=client.db('myDB');
      const collect=db.collection("myCollection");
      collect.findOne({"username":req.session.loginid},function(err,result){
        if (err)console.log(err);
    else {
      if ((result.trips).includes("paris"))    {
        
        alert("paris is already in your wanttogo list !");
        res.render('paris');
      
      }
      else {  
          result.trips[result.trips.length]="paris";
          collect.updateOne({"username":req.session.loginid},{$set:{"trips":result.trips}},function(err,result){
            if (err)console.log(err);
          });
      
          res.render('paris');
      
      
        }
    }  
      });
      });
    });
app.post('/incawanttogo',function(req,res){
   var trip=new Array();
   MongoClient.connect(url,function(err,client){
      if (err)throw err;
      var db=client.db('myDB');
      const collect=db.collection("myCollection");
      collect.findOne({"username":req.session.loginid},function(err,result){
        if (err)console.log(err);
    else {
      if ((result.trips).includes("inca"))    {
        
        alert("Inca is already in your wanttogo list !");
        res.render('inca'); 
      
      }
      else {  
          result.trips[result.trips.length]="inca";
          collect.updateOne({"username":req.session.loginid},{$set:{"trips":result.trips}},function(err,result){
            if (err)console.log(err);
          });
      
          res.render('inca'); 
      
      
        }
    }  
      });
      });
    });
    app.post('/romewanttogo',function(req,res){
      var trip=new Array();
      MongoClient.connect(url,function(err,client){
         if (err)throw err;
         var db=client.db('myDB');
         const collect=db.collection("myCollection");
         collect.findOne({"username":req.session.loginid},function(err,result){
          if (err)console.log(err);
      else {
     
        if ((result.trips).includes("rome"))    {
          alert("rome is already in you wanttogo list");
          res.render('rome');
        
        }
        else {  
            result.trips[result.trips.length]="rome";
            collect.updateOne({"username":req.session.loginid},{$set:{"trips":result.trips}},function(err,result){
              if (err)console.log(err);
            });
        
            res.render('rome');
        
        
          }
      }  
        });
        });
      });
app.post('/baliwanttogo',function(req,res){
   MongoClient.connect(url,function(err,client){
      if (err)throw err;
      var db=client.db('myDB');
      const collect=db.collection("myCollection");
      collect.findOne({"username":req.session.loginid},function(err,result){
        if (err)console.log(err);
    else {

if ((result.trips).includes("bali"))    {
  
  alert("Bali is already in you wanttogo list");
  res.render('bali');

}
else {  
    result.trips[result.trips.length]="bali";
    collect.updateOne({"username":req.session.loginid},{$set:{"trips":result.trips}},function(err,result){
      if (err)console.log(err);
    });
    res.render('bali');



  }
    }  
      });
      });
    });
app.post('/annapurnawanttogo',function(req,res){
   var trip=new Array();
   MongoClient.connect(url,function(err,client){
      if (err)throw err;
      var db=client.db('myDB');
      const collect=db.collection("myCollection");
      collect.findOne({"username":req.session.loginid},function(err,result){
        if (err)console.log(err);
    else {
      if ((result.trips).includes("annapurna"))    {
        
        alert("annapurna is already in you wanttogo list");
        res.render('annapurna');
      
      }
      else {  
          result.trips[result.trips.length]="annapurna";
          collect.updateOne({"username":req.session.loginid},{$set:{"trips":result.trips}},function(err,result){
            if (err)console.log(err);
          });
          res.render('annapurna');
      
      
        }
    }  
      });
      });
    });
 
 app.post('/login',(req,res)=>{
 const  username1 =req.body.username;
   const password=req.body.password;
   if (username1==='admin' && password==='admin'){
    req.session.loginid='admin';
    req.session.log=true;
                res.redirect("/home");
   }
   else {
 MongoClient.connect(url,function(err,client){
   if (err)throw err;
   var db=client.db('myDB');
   const collect=db.collection("myCollection");
   collect.findOne({username:username1},function(err,foundUser){
      if (err){
         console.log (err);
      }else {if (foundUser){
         if (foundUser.password===password){
          req.session.loginid=foundUser.username;
req.session.log=true;
            res.redirect("/home");
         }else {res.render('login',{error:""});
          alert("Password is not correct !");
      res.render('login');
      }
      }else {
       alert( "Username is not correct !");

      res.render('login');
      }
      }
   })
 });}
 });
app.get('/registration',(req,res)=>{
   res.render('registration')
});
app.get('/register',(req,res)=>{
  res.render('registration')
});
app.get("/home",function(req,res){
 if (req.session.log==true)
   res.render('home');
   else {
      res.render('login',{error:""});
   }
})
app.post('/register',(req,res)=>{
  if (req.body.username.length==0||req.body.password.length==0){

    alert("You should write username and password!");
    res.render('registration');
}
  else {
MongoClient.connect(url,function(err,client){
  if (err)throw err;
  var db=client.db('myDB');
  
  const Acc={
   "username" :req.body.username,
  "password":req.body.password, "trips":new Array()
 };

 const collect=db.collection("myCollection");
 collect.findOne({username:req.body.username},function(err,foundUser){
  if (err){
     console.log (err);
  }else {if (foundUser!=null){
    
    alert("Sorry ! There is already username with this name ");
res.render('registration'); 
     }else {
      collect.insertOne(Acc);
      req.session.log=true;
      req.session.loginid=Acc.username;
      res.redirect('/login');
     }}
  });
 

});
}});
 app.get ('/cities',(req,res)=>{
   if (req.session.log==true)
   res.render('cities');
   else {
    res.render('login');
   }
 });
 app.get ('/islands',(req,res)=>{
   if (req.session.log==true)
   res.render('islands');
   else {
    res.render('login');
   }
 });
 app.get ('/wanttogo',(req,res)=>{
   if (req.session.log==true){
    MongoClient.connect(url,function(err,client){
      if (err)throw err;
      var db=client.db('myDB');
      const collect=db.collection("myCollection");
      collect.findOne({"username":req.session.loginid},function(err,result){
        if (err)console.log(err);
    else {
      if (result.trips!=null)
   res.render('wanttogo',{trips:result.trips});
   else res.render('wanttogo',{trips:new Array()});
   
    }  
      });
      });
  }
   else {
    res.render('login');
   }
 });
 app.get ('/annapurna',(req,res)=>{
   if (req.session.log==true)
   res.render('annapurna');
   else {
    res.render('login');
   }
 });
 app.get ('/bali',(req,res)=>{
   if (req.session.log==true)
   res.render('bali');
   else {
    res.render('login',);
   }
 });
 app.get ('/paris',(req,res)=>{
   if (req.session.log==true)
   res.render('paris');
   else {
    res.render('login');
   }
 });
 app.get ('/rome',(req,res)=>{
   if (req.session.log==true)
   res.render('rome');
   else {
    res.render('login');
   }
 });
 app.get ('/inca',(req,res)=>{
   if (req.session.log==true)
   res.render('inca');
   else {
    res.render('login');
   }
 });
 app.get ('/santorini',(req,res)=>{
   if (req.session.log==true)
   res.render('santorini');
   else {
    res.render('login');
   }
 });
 app.get ('/hiking',(req,res)=>{
   if (req.session.log==true)
   res.render('hiking');
   else {
    res.render('login');
   }
 });
 
app.listen(3000);
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
