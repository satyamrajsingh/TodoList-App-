const mongoose=require('mongoose');

const todoSchema=new mongoose.Schema({
           description:{
               type:String,
               required:true
           },
           date: {
               type: Date,              
               required:true
               
           },
           category: {
               type:String,
               required:true
           }

});

const TOdolist=mongoose.model('TOdolist', todoSchema);



module.exports = TOdolist;