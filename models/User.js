const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: [true, 'Please enter an email'], // [ <attribute_value>, <error_message>]
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter valid email'] // validates email
    },
    password: {
        type: String,
        require: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters']
    },
    name: {
        type: String,
        require: [true, 'Please enter the name'],
    },
    location: {
        type: String,
        require: [true, 'Please enter your location'],
    }
});

// Fire a function before doc saved to DB
userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt); // this, refers to user instance
    next();
});

// Static method to login user
userSchema.statics.login = async function(email, password){
    const user = await this.findOne({ email }); // this is user model
    if(user){
       const auth = await bcrypt.compare(password, user.password);
       if(auth){
        return user;
       }
       throw Error('Incorrect password');
    }
    throw Error('Incorrect email');
}

const User = mongoose.model('user', userSchema);

module.exports = User;

