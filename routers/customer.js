const express = require('express');

const customers = require('../data/customers');

const router = express.Router();

// GET /customers - все клиенты
router.get('/', (req, res) => {
    res.send(customers);
});

// GET /customers/1 - клиент с кодом 1
router.get('/:id', (req, res) => {
    let id = req.params.id;
    let cust = customers.find(n => n.id == id);
    let message = (cust != undefined)
        ? cust 
        : `Организация c id:${id} НЕ найдена`;
 
    res.send(message);
});

module.exports = router;