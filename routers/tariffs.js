const express = require('express');

const tariffs = require('../data/tariffs');

const router = express.Router();

// GET /tariffs  -  все тарифы
router.get('/', (req, res) => {
    let message = 'Все тарифы:<br>' + JSON.stringify(tariffs);
    res.send(message);
});

// GET /tariffs/1  -  тариф с кодом 1  
router.get('/:id', (req, res) => {
    let id = req.params.id;
    let tariff = tariffs.find(n => n.id == id);
    let message = (tariff != undefined)
        ? `Тариф с кодом ${id}:<br>` + JSON.stringify(tariff) 
        : `Тариф c id:${id} НЕ найден`;
 
    res.send(message);
});

// GET /tariffs/customers/1 - тарифы для клиента 1
router.get('/customers/:id', (req, res) => {
    let custId = req.params.id;
    let tariffOnCustomer = tariffs.filter(n => n.custid == custId);
    console.log(tariffOnCustomer, tariffOnCustomer.length );
    let message = (tariffOnCustomer.length > 0)
        ? `Тарифы для клиента с кодом ${custId}:<br>` + JSON.stringify(tariffOnCustomer) 
        : `Тарифы для клиента с id:${custId} НЕ найдены`;
 
    res.send(message);
});

// GET /tariffs/customers/:custid/directions/:nameid- тариф для клиента (custid) на одно направление(nameid)

router.get('/customers/:custid/directions/:nameid', (req, res) => {
    
    let custId = req.params.custid;
    let nameId = req.params.nameid;
    
    let tariffOnDirectionOnCustomer = tariffs.filter(n => n.custid == custId && n.nameid == nameId);

    let text = `Тарифы для клиента с кодом '${custId}' для направления с кодом '${nameId}'`;
    let message = (tariffOnDirectionOnCustomer.length > 0)
        ? text + ":<br>" + JSON.stringify(tariffOnDirectionOnCustomer)
        : text + ` НЕ найдены`;
 
    res.send(message);
});



module.exports = router;