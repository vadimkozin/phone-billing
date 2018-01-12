const router = require('express').Router();
const { customer: {showCustomers, showCustomerById, findCustomer} }  = require('../controllers');

router.get('/', showCustomers);
router.get('/:id', findCustomer, showCustomerById );

module.exports = router;