const mongoose = require('mongoose');

//define the persong schema 
const personSchema=new mongoose.Schema({
    name:{
    type:String, 
    required:true,
    },
    age:
    {
        type:Number,

    },
    work:{
        type:String,
        enum:['chef','water','manager'],
        required:true,
    },
    mobile:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    address:{
        type:String,
    },
    salary:{
        type:Number,
        required:true,
    }
});
//creatge person models

const Person=mongoose.model('Person',personSchema);
module.exports=Person;