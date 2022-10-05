const User = require('../models/User');
const jwt = require('jsonwebtoken');


// Handle errors
const handleError = (err) => {
    console.log(err.message, err.code);
    let errors = {email: '', password: ''}

    // incorrect email
    if(err.message === 'Incorrect email'){
        errors.email = 'Email is not registered';
    }

    // incorrect password
    if(err.message === 'Incorrect password'){
        errors.email = 'Incorrect Password';
    }
    // duplicate error code
    if(err.code === 11000){
        errors.email = 'That email is already registered';
        return errors;
    }
    
    // Validation errors
    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}

const maxAge= 3 * 24 * 60 * 60; // time in seconds
const createToken = (id) => {
    return jwt.sign({ id }, 'blog project', {
        expiresIn: maxAge
    })
}

module.exports.signup_get = (req, res) => {
    res.render('signup');
}

module.exports.login_get = (req, res) => {
    res.render('login');
}

module.exports.signup_post = async (req, res) => {
    const {email, password, name, location} = req.body;

    try{
       const user = await(User.create({ email, password , name, location}));
       const token = createToken(user._id);
       res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});
       res.status(201).json({ user: user._id });
    }catch(ex){
        const errors = handleError(ex);
        res.status(400).json({ errors });
    }
}

module.exports.login_post = async (req, res) => {
    const {email, password} = req.body;
    try{
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});
        res.status(200).json({ user: user._id });
    }catch(err){
        const errors = handleError(err);
        res.status(400).json({ errors });
    }
}

module.exports.logout_get = (req, res) => {
    res.cookie('jwt', ''), { maxAge: 1};
    res.redirect('/articles');
}

module.exports.userDetails_get = async (req, res) => {
    console.log(res.locals.user);
    res.render('userDetails', {user: res.locals.user});
}

