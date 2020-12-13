const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const path = require('path')

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_DATABASE}`;
mongoose.connect( uri, 
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true , 
        useCreateIndex: true,
        useFindAndModify: false 
    },
    (error) => {
        if (error) throw error;
    });



const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB connection made')
});


app.use('/users', require('./routes/userRouter'))
app.use('/users', require('./routes/userVerified'))
app.use('/users', require('./routes/rentRoutes'))
app.use('/users', require('./routes/hostRoutes'))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get('*', (req,res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}

app.listen(port, () => {
    console.log('server running on ' + port)
});