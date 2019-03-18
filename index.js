const express = require('express'),
      cors = require('cors'),
      mongoose = require('mongoose');
require('express-group-routes');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(require('morgan')('dev'));

const db = require('./config/database');
mongoose.connect(db.mongoURI, {
    useNewUrlParser: true
})
.then(() => console.log('MongoDB was successfully connected'))
.catch((err) => console.log(err));

app.use(express.json());

app.group('/api/v1', (router) => {
    router.use('/customers', require('./components/customers'));
    router.use('/genres', require('./components/genres'));
});

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status(404);
    next(err);
});

app.use(function(err, req, res, next) {
    console.log(err.stack);
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    });
});

const server = app.listen(process.env.PORT || 3000, () => {
    console.log('Listening on port ' + server.address().port);
});