const router = require('express').Router();
const { number: {showNumbers, showNumberById, findNumber} }  = require('../controllers');

router.get('/', showNumbers);
router.get('/:id', findNumber, showNumberById );

module.exports = router;