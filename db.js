const mongoose = require('mongoose');

//degine the mongodb connection url
const mongoUrl='mongodb://localhost:27017/hotels'

//set up mongodb connection

mongoose.connect(mongoUrl,{
    
    useNewUrlparser:true,
    useUnifiedTopology:true
});

//get the deagualt connection
//mongoose mantains a deafault connection object represting the mongodb connection.
const db=mongoose.connection;

//degfine event llisteners for databse connection 
db.on('connected',()=>{
    console.log('connected to mongodb server');
})
db.on('error',(err)=>{
    console.log('mongodb connection error',err)
})
db.on('disconnected',()=>{
    console.log('mongodb disconnnected');
})
//export the database connection
module.exports=db;