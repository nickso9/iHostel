const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../auth/auth');
const User = require('../models/UserModel');
const Host = require('../models/HostModel');
const mongoose = require('mongoose')


router.post('/register', async (req, res) => {
    try {

        const { accountType, email, password, passwordCheck, userName, address, images } = req.body;
        console.log(req.body)
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
            accountType,
            email,
            password: passwordHash,
            userName,
            address,
            images
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
                accountType: user.accountType
            }});

    } catch (error) {
        res.status(500).json({error: error.message});
    };

});


router.get('/find', auth, async (req, res) => {
    
    const hostFind = await Host.findOne({_id: req.query._id}, "usersYes")
    let userArray = []

    await hostFind.usersYes.map(e => {
        if (e.day == req.query.day) {
            userArray.push(e.user)
        } })

    let userObj = []
    
    await userArray.map(e => {
        userObj.push(mongoose.Types.ObjectId(e))
    })

    const userFind = await User.find({"_id": { $in: userObj}})
    res.send(userFind)
})

router.get('/userglance/:id', auth, async (req,res) => {
    console.log('hihii')
    console.log(req.user)
    const userFind = await User.find({_id: req.user}, "userHistory")

    const bookedArray = []
    const { userHistory } = userFind[0]
    
    for (const key in userHistory) {
        bookedArray.push(userHistory[key])    
    }

    res.send(await bookedArray)
})

module.exports = router;