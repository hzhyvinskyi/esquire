const router = require('express').Router();

router.use('/v1/customers', require('./customer.routes'));

module.exports = router;