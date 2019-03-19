const router = require('express').Router();

router.use('/v1/movies', require('./movie.routes'));

module.exports = router;