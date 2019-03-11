const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();
const port = process.env.NODE_ENV || 3000;

const db = require('./config/database');
mongoose.connect(db.mongoURI, {
    useNewUrlParser: true
})
  .then(() => console.log('MongoDB was successfully connected'))
  .catch((err) => console.log(err));


app.listen(port, () => {
    console.log(`Server is running on ${port} port`);
});