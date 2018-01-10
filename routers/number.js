const express = require('express');

const numbers = require('../data/numbers');

const router = express.Router();

// GET /numbers - все номера
router.get('/', (req, res) => {
    res.send(numbers);
});

// GET /numbers/1 - номер с кодом 1
router.get('/:id', (req, res) => {
    let id = req.params.id;
    let number = numbers.find(n => n.id == id);
    let message = (number != undefined)
        ? number 
        : `Номер c id:${id} НЕ найден`;
 
    res.send(message);
});

module.exports = router;
