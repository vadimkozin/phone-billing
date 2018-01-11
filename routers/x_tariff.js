const router = require('express').Router();
const { tariff: {showTariffs, showTariffById, findTariff,
        showTariffsForCustomer, showTariffCustomerOnDirection} } 
        = require('../controllers');

router.get('/', showTariffs);
router.get('/:id', findTariff, showTariffById );
router.get('/customers/:id', showTariffsForCustomer);
router.get('/customers/:cid/directions/:nid', showTariffCustomerOnDirection);

module.exports = router;