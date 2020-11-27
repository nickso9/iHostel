const router = require('express').Router();
const auth = require('../auth/auth');
const User = require('../models/UserModel')

router.post('/rent/add/:id', auth, async (req, res) => {
    const { roomId, date } = req.body
    const userId = req.user
    const querySearch = { _id: userId, [`userBooked.${date}`] : { $exists: true}}
    const checkIt = await User.findOne(querySearch)
        if (checkIt) {
            console.log('already added.')
            res.json('already booked a day')
        } else {
            console.log('not addedededed')
            User.updateOne({ 
                _id: userId
            }, {  $addToSet: {
                    userBooked: {
                        [date]: roomId
                    }     
                } 
            })
            .then(response => {
                res.json(response)
            })
            .catch(error => res.json(error))
          
        }

})





module.exports = router