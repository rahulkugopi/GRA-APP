require('dotenv').config()
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config()
const app = express();

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});

const connectDB = mongoose.connection;

connectDB.on('error', () => {
    console.log(error);
});

connectDB.on('open', () => {
    console.log('Connected to Database...');
});

app.use(express.json());

app.use('/api/users', require('./routes/users/users'));
app.use('/api/home/', require('./routes/home/banner'));
app.use('/api/home/', require('./routes/home/first'));
app.use('/api/home/', require('./routes/home/second'));
app.use('/api/home/', require('./routes/home/fewreasons'));
app.use('/api/home/', require('./routes/home/fewstep'));
app.use('/api/home/', require('./routes/home/weaccept'));
app.use('/api/home/', require('./routes/home/footer'));

app.listen(8000, function(){
    console.log('Server Started');
});