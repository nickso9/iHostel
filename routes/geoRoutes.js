const axios = require('axios');
const router = require('express').Router();
require('dotenv').config();

const apiKey = process.env.API_KEY


router.get('/api/geo', async (req, res) => {
    try {
        axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
            address: req.query.address,
            key: apiKey
            }
        })
        .then(response => {
            const lat = response.data.results[0].geometry.location.lat
            const lng = response.data.results[0].geometry.location.lng
            res.json(lng+ ','+ lat)
        })
    } catch (error) {
        res.json(error)
    }
})


module.exports = router
