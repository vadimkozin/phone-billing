const router = require('express').Router();
const { number: {showNumbers, showNumberById, findNumber, showNumbersForCustomer} }  = require('../controllers');

router.get('/', showNumbers);
router.get('/:id', findNumber, showNumberById );
router.get('/customers/:cid', showNumbersForCustomer );

module.exports = router;