const NodeGeocoder = require('node-geocoder');


const options = {
  provider: 'mapquest',
  apiKey: process.env.GEOCODE_API,
  formatter: null 
};
 
const geocoder = NodeGeocoder(options);
 

module.exports = geocoder