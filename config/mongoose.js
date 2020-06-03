//require the library
const mongoose=require('mongoose');

//connect to the database
mongoose.connect('mongodb://localhost/todo_list_db',{
    useNewUrlParser: true,useUnifiedTopology: true});

//aquire the connection(to check if it's successful)
const db=mongoose.connection;


//check for error
db.on('error',console.error.bind(console,'error connecting to db'));


//if database is connected
db.once('open',function(){
    console.log('Succesfuly connected to DB');
});


module.exports=db;