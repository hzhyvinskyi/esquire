const router = require('express').Router();

router.use('/', require('./genre.routes'));

module.exports = router;