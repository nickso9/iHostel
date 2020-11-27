const router = require('express').Router();
const auth = require('../auth/auth');
const User = require('../models/UserModel')

router.post('/rent/add/:id', auth, (req, res) => {
    console.log(req)
})







module.exports = router