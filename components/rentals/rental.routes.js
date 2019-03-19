const router = require('express').Router();
const {index, store} = require('./rental.controller');

router.get('/', index);
router.post('/', store);

module.exports = router;