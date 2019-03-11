const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

const db = require('./config/database');
mongoose.connect(db.mongoURI, {
    useNewUrlParser: true
})
    .then(() => console.log('MongoDB was successfully connected'))
    .catch((err) => console.log(err));

const genresRoutes = require('./components/genres/genre.routes');

app.use(express.json());

app.use('/api/v1/genres', genresRoutes);

app.all('*', (req, res) => {
    res.status(404).json({ error: { message: 'Not Found' }});
});

app.listen(port, () => {
    console.log(`Server is running on ${port} port`);
});