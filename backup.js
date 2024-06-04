const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const app = express();
const port = 3000;

app.use(cors());
app.use(bodyparser.json());

var dbname = "codecrafters";
const url = `mongodb+srv://shaikadam642:PgHZU4iTiJtQlRgY@cluster0.wzj4d7w.mongodb.net/+${dbname}`;
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

mongoose.connect(url);

const userschema = new mongoose.Schema({
    username : String,
    password: String
})
const User = mongoose.model('User',userschema,'Users');


function authenticate(req,res,next) {
    var token = req.headers.authorization;
    if(!token) {
        return res.status(401).send('Unauthorized: No token provided');
    }

    jwt.verify(token,'S3cret',(err,decoded) => {
        if(err) {
            return res.status(401).send('Unauthorized: Invalid token');
        }
        next();
    })
}

app.post('/signup',async (req,res) => {
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
})  

app.post('/login',async (req,res) => {
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
})

app.listen(port,() => {
    console.log(`Listening on ${port}`);
})