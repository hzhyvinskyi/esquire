const router = require('express').Router();

router.use('/', require('./customer.routes'));

module.exports = router;