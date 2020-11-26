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
 

router.get('/rent', async (req, res) => {
    const userId = req.query.user
    let limit = 10;
    let maxDistance = (25/3963)
    let coords = ["-121.478851", "38.575764"]
    // coords[0] = req.body.longitude
    // coords[1] = req.body.latitude
  
    Host.find({
        $and: [ {
        "loc.coordinates": {
            $geoWithin: {
                    $centerSphere: [ coords, maxDistance ]     
                }
            }
       }, {
           "usersNo": {
           "$ne": userId
           }
        }
        ] } )
       .then(response => {
           console.log(response)
           res.json(response)   
        })
       .catch(error => res.json(error))

})

router.post('/rent/:id', async (req, res) => {
    const userSaysNo = req.body.userSaysNo
    const placeDenied = req.params.id
    await Host.updateOne({
        _id: placeDenied
    },
    {$push: {usersNo: userSaysNo}}
    )
    .then(response => res.json(response))
    .catch(error => res.json(error))
})




module.exports = router