const router = require('express').Router();
const auth = require('../auth/auth');
const jwt = require('jsonwebtoken')
const User = require('../models/userModel');



router.post('/tokenIsValid', async (req, res) => {
    try {
        const token = req.header('x-auth-token');
        if (!token) return res.json(false);

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified) return res.json(false);

        const user = await User.findById(verified.id);
        if (!user) return res.json(false);

        return res.json(true)

    } catch (error) {
        res.status(500).json({error: error.message});
    };
})

router.get('/', auth, async (req, res) => {
    const user = await User.findById(req.user);
    res.json({
        userName: user.userName,
        id: user._id,
        accountType: user.accountType,
        images: user.images
    })
})




module.exports = router;