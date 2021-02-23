const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
mongoose.set('useCreateIndex', true);

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },

    password:{
        type: String,
        required: true 
    }
})

userSchema.methods.generatorJWT=function(){
    return jwt.sign({
        username:this.username
    }, "contr4s3n14")
}

mongoose.model('user', userSchema);