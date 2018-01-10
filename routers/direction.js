const express = require('express');

const directions = require('../data/directions');

const router = express.Router();

// GET /directions - все направления
router.get('/', (req, res) => {
    res.send(directions);
});

// GET /directions/1 - направление с кодом 1
router.get('/:id', (req, res) => {
    let id = req.params.id;
    let dir = directions.find(n => n.id == id);
    let message = (dir != undefined)
        ? dir 
        : `Направление c id:${id} НЕ найдено`;
 
    res.send(message);
});

module.exports = router;