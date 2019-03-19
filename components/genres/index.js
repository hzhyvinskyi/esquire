const router = require('express').Router();

router.use('/v1/genres', require('./genre.routes'));

module.exports = router;