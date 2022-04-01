require('dotenv').config()
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config()
const app = express();
const cors = require('cors');

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});

const connectDB = mongoose.connection;

connectDB.on('error', () => {
    console.log(error);
});

connectDB.on('open', () => {
    console.log('Connected to Database...');
});

app.use(express.json());
app.use(cors());

app.use('/api/users', require('./routes/users/users'));
app.use('/api/home/', require('./routes/home/menu'));
app.use('/api/home/', require('./routes/home/banner'));
app.use('/api/home/', require('./routes/home/first'));
app.use('/api/home/', require('./routes/home/firstitems'));
app.use('/api/home/', require('./routes/home/second'));
app.use('/api/home/', require('./routes/home/seconditems'));
app.use('/api/home/', require('./routes/home/fewreasons'));
app.use('/api/home/', require('./routes/home/fewreasonsitems'));
app.use('/api/home/', require('./routes/home/fewstep'));
app.use('/api/home/', require('./routes/home/fewstepitems'));
app.use('/api/home/', require('./routes/home/weaccept'));
app.use('/api/home/', require('./routes/home/weacceptitems'));
app.use('/api/home/', require('./routes/home/footer'));
app.use('/api', require('./routes/login/login'));

app.listen(8000, function(){
    console.log('Server Started');
});