//aquire the express module
var express=require('express');

const port=2000;
//aquire the path module
const path=require('path');



const db=require('./config/mongoose');

const TODO=require('./models/TodoSchema');



//store express methods in app variable
var app=express();

//initial todo list
var todoList=[{
    
    description:'This is  a Todo-List',
    date: '23/3/2001',
    category:'Random'
}];

//set up template engine
app.set('view engine','ejs');
app.set('views','./views');

//middleware to allow access of static files in express
app.use(express.static('./public'));


//middleware for use in post request to convert incoming request obj to string/array
app.use(express.urlencoded());

//takes up the (/todolist) url and displays added list
app.get('/todoList',function(req,res)
{

      TODO.find({},function(err,TODOs){

          
        if(err){
            console.log('Error in fetcching Lists');
            return;
        }
    

        return res.render("todo",{
            //todolist(todo.ejs):todoList(array)
           todolist:TODOs
       }); 

      })

      

});

app.post('/todoList',function(req,res){     


      TODO.create({
          description:req.body.description,
          date: req.body.date,
          category:req.body.category
      })
      
     .then(newList => {
         console.log('***',newList);
         return  res.redirect('/todoList');

     })
     .catch(err => {console.log("error in checking list");
     return;
    });

});


app.post('/todoList/delete',function(req,res)
{
       var query={
           _id: {
               $in:req.body.check
           } 
       }
   
     //mongoose funtion to dlete all the checked list
    TODO.deleteMany(query,function(err){
             if(err){
                 console.log('error in deleting an object from db');
                 return;
             }
             
    });
    
    return res.redirect('/todolist');
});

//first the app listens to the port
app.listen(port,function(err){
    if(err)
    {
        console.log('Error has occured:',err);
    }
    console.log('Yup!My express server is running on port:', port);
});