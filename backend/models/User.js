const mongoose=require('mongoose')

const {Schema}=mongoose;

const UserSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    location:{
        name:String,
        required:true
    },
    email:{
        name:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})