const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());


const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_DATABASE}`;
mongoose.connect( URI, 
    { useNewUrlParser: true, useUnifiedTopology: true , useCreateIndex: true},
    (error) => {
        if (error) throw error;
    });

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB connection made')
});


const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log('server running on ' + PORT)
});

app.use('/users', require('./routes/userRouter'))
app.use('/users', require('./routes/userVerified'))
app.use('/users', require('./routes/geoRoutes'))
