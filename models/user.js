const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    email:{
        type:String,
        required:true,
    },
});
//automatic generate password username and (salting) etc so that this line use (passportLocalManogo we create the object that have multiple methods)
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);