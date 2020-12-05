const router = require('express').Router();
const auth = require('../auth/auth');
const User = require('../models/UserModel')
const Host = require('../models/HostModel')

router.post('/rent/add/:id', auth, async (req, res) => {
    console.log('post request')
    const { roomId, date } = req.body
    const userId = req.user
    const querySearch = { _id: userId, [`userBooked.${date}`] : { $exists: true}}
    const queryRoomSearch = { _id: roomId, [`usersYes.${date}`] : { $exists: true}}
    const checkIt = await User.findOne(querySearch)
    const checkRoom = await Host.findOne(queryRoomSearch)
        if (checkRoom || checkIt) {
            console.log('already booked')
            res.json('already booked a day')
        } else {
            console.log('booking')
            User.updateOne({ 
                _id: userId
            }, {  $addToSet: {
                    userBooked: {
                        [date]: roomId
                    }     
                } 
            })
            .then(response => {
                
            })
            .catch(error => res.json(error))
          
        //////////

            Host.updateOne({
                _id: roomId
            }, {  $addToSet: {
                    usersYes: {
                        [date]: userId
                    }     
                } 
            })
            .then(response => {
                res.json(response)
            })
            .catch(error => res.json(error))

        }

})


router.put('/rent/add/:id', auth, async (req, res) => {
    console.log('canceling')
    try {
    const { roomId, date } = req.body
    const userId = req.user
    const cancelUsersRoom = {userBooked: { [date] : roomId}}
    const cancelRoomsUser = {usersYes: { [date]: userId}}
        await Host.updateOne({_id: roomId},{$pull: cancelRoomsUser})
        .then(() => {
            return User.updateOne({_id: userId}, {$pull: cancelUsersRoom})
            .then(async (e) => await res.status(200).send(e))
            
        })
        
    
    } catch (error) {
        console.log(error)
    }
})


router.get('/rent', async (req, res) => {
    const userId = req.query.user
    const date = req.query.date
   
    let maxDistance = (25/3963)
    let coords = ["-121.478851", "38.575764"]
    // coords[0] = req.body.longitude
    // coords[1] = req.body.latitude
    const queryStay = {usersYes: { [date]: userId}}
    const alreadyHosted = await Host.findOne(queryStay)
    if (alreadyHosted) {
        res.send({hosted: true,
            alreadyHosted: [alreadyHosted]
        })
    } else {


        const querySearch = {[`usersYes.${date}`] : { $exists: false}}
        
        // const querySearch = {usersYes: `usersYes.${date}`}
         
        Host.find({
            $and: [ {
            "loc.coordinates": {
                $geoWithin: {
                        $centerSphere: [ coords, maxDistance ]     
                    }
                }
        }, {
            // "usersNo": {
            //     "$ne": userId
            // },
            "usersNo": {
                "$ne": {[date] : userId}
            },
            "active": {
                "$ne": false
            },
            }, 
            querySearch,
            {startDate:{$lte:new Date()}},{endDate:{$gte:new Date()}}
            ] } )
        .then(response => {
            console.log(response)
            res.send(response)   
            })
        .catch(error => res.json(error))
        }
})

router.post('/rent/:id', auth, async (req, res) => {
    
    const userSaysNo = req.user
    const userSaysNoDay = req.body.day
    const placeDenied = req.params.id
    await Host.updateOne({
        _id: placeDenied
    }, {$addToSet: { "usersNo": {[userSaysNoDay]: userSaysNo}}})
    .then(response => {
        console.log(response)
        res.json(response)
    })
    .catch(error => res.json(error))
})


module.exports = router