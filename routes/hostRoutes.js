const router = require('express').Router();
const auth = require('../auth/auth');
const Host = require('../models/hostModel')


router.post('/host', auth, async (req, res) => {

    const hostToDb = new Host(req.body)
    hostToDb.save()
    .then(response => {
        console.log(response)
        res.json('host added')
    })
    .catch(error => {
        error.status(400).json('error : ' + error)
    })

})
 






module.exports = router