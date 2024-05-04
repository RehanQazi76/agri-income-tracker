const { string } = require('joi');
const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String
    }

});

const UserModel = mongoose.model('User', userSchema);
module.exports= UserModel;  