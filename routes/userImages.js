// const router = require('express').Router()
// const cloudinary = require("cloudinary").v2;
// const dotenv = require('dotenv')
// dotenv.config()


// cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.API_KEY,
//     api_secret: process.env.API_SECRET
//     });
   

// router.post('/images', (req, res) => {
//     console.log(req.files)
//     // try {

//     // // const file = req.files.image
//     // // const eager_options = { width: 150, height: 150, crop: 'scale'};
//     // // cloudinary.uploader.upload(file.tempFilePath, eager_options)
//     // // .then(result => {
//     // //     console.log(result)
//     // //     })
//     // //     .catch(err => console.log(err))  

//     // // } catch (error) {
//     // //     console.log(error)
//     // // }  
// })



module.exports = router