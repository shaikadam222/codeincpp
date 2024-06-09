const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

async function signUp(req, res) {
    try {
        var hpass =await bcrypt.hash(req.body.password,10);
        const olduser = await User.findOne({username : req.body.username});
        if(!olduser) {
            const newuser = new User ({
                username : req.body.username,
                password : hpass
            })
            await newuser.save();
            return res.send('User created Succefully').status(201);
        } 
        res.send('Username already exists').status(401);
    } catch(err) {
        console.log(err);
        res.send('Error while creating user').status(500);
    }
}

async function login(req, res) {
    try {
        const user = await User.findOne({username : req.body.username});
        if(!user) {
            return res.send('User not found').status(404);
        }
        const validp = await bcrypt.compare(req.body.password,user.password);
        if(!validp) {   
            return res.send('Wrong Password').status(401);
        }
        
        const token = jwt.sign({userid : user._id},'S3cret');
        res.status(200).json({token});

    } catch(err) {
        console.log(err);
        res.send('error while logging in').status(500);
    }
}   

module.exports = { signUp, login };
