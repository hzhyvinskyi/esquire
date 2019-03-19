const router = require('express').Router();

router.use('/v1/reltals', require('./rental.routes'));

module.exports = router;