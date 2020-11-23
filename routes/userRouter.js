const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');


router.post('/register', async (req, res) => {
    try {
        let { email, password, passwordCheck, userName } = req.body;
        
        if (!email || !password || !passwordCheck || !userName) {
            return res.status(400).json({msg: 'All fields required.'})
        };
        if (password.length < 5) {
            return res.status(400).json({msg: 'password needs to be atleast 5 characters.'})
        };
        if (password !== passwordCheck) {
            return res.status(400).json({msg: "password doesn't match."})
        };

        const existingUser  = await User.findOne({email: email}) ;
        if (existingUser) {
            return res.status(400).json({msg: 'An account with this email already exists.'})
        }; 

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
    
        const newUser = new User({
            email,
            password: passwordHash,
            userName
        });

        const savedUser = await newUser.save();
        res.json(savedUser);

    } catch (error) {
        res.status(500).json({error: error.message})
    };
});


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({msg: 'email or password required.'})
        };

        const user = await User.findOne({email: email});

        if (!user) {
            return res.status(400).json({msg: 'account not found.'})
        };
        
        const checkPasswordMatch = await bcrypt.compare(password, user.password);

        if (!checkPasswordMatch) {
            return res.status(400).json({msg: 'invalid login credentials.'})
        };

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        res.json({
            token, 
            user: {
                id: user._id, 
                userName: user.userName,
            }});

    } catch (error) {
        res.status(500).json({error: error.message});
    };

});



module.exports = router;