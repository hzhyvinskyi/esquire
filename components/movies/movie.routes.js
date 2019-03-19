const router = require('express').Router();
const {index, show, store, update, destroy} = require('./movie.controller');

router.get('/', index);
router.get('/:id', show);
router.post('/', store);
router.put('/:id', update);
router.delete('/:id', destroy);

module.exports = router;