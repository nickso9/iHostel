const router = require('express').Router();
const auth = require('../auth/auth');
const Host = require('../models/HostModel')


router.post('/host', auth, async (req, res) => {

    const hostToDb =  new Host(req.body)
    await hostToDb.save()
    .then(response => {
        console.log(response)
        res.json('host added')
    })
    .catch(error => {
        console.log(error)
    })

})
 



module.exports = router