require('dotenv').config()
const express = require('express');
const dotenv = require('dotenv');
dotenv.config()
const app = express();
const cors = require('cors');

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});

//const connectDB = mongoose.connection;

//connectDB.on('error', () => {
   // console.log(error);
//});

//connectDB.on('open', () => {
   // console.log('Connected to Database...');
//});

app.use(express.json());
app.use(cors());

app.use('/api/users', require('./routes/users/users'));

app.listen(8000, function(){
    console.log('Server Started');
});