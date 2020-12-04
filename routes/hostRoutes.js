const router = require('express').Router();
const auth = require('../auth/auth');
const Host = require('../models/HostModel')


router.post('/host', auth, async (req, res) => {
    const hostToDb =  new Host(req.body)
    await hostToDb.save()
    .then(response => {
        res.send(response)
    })
    .catch(error => {
        console.log(error)
    })

})

router.get('/host/:id', auth, async (req,res) => {
    const pullHostInfo = req.params.id
    const hostInfo = await Host.findOne({userId: pullHostInfo}) 
    res.send({
        hosting: hostInfo !== null,
        data: hostInfo     
    }) 
})
 

router.put('/host/:id', auth, async (req, res) => {
    // console.log(req.body.genInfo)
    // console.log(req.params.id)
    let insert;
    if (req.body.genInfo) {
        insert = {title: req.body.genInfo.title, description: req.body.genInfo.description} 
    } else if (req.body.updateImages) {
        insert = {images: req.body.updateImages.images}
    }
    const updateHostInfo = await Host.findByIdAndUpdate({_id: req.params.id}, insert)
    res.send(updateHostInfo)

})






module.exports = router