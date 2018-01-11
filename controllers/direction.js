const directions = require('../data/directions');

module.exports = {
    // GET /directions - все направления
    showDirections(req, res) {
        res.render('directions', {
            id: 'directions',
            title: 'Направления',
            directions
        });
    },

    findDirection(req, res, next) {
        let id = req.params.id;
        let dir = directions.find(n => n.id == id);

        if (!dir) {
            let error = new Error(`Направление c id:${id} НЕ найдено`);
            error.status = 404;
            next(error);
        } else {
            req.direction = dir;

            next();
        }
    },

    // GET /directions/1 - направление с кодом 1
    showDirectionById(req, res) {
        res.render('direction', {
            id: 'direction',
            title: req.direction.name,
            direction: req.direction
        });      
    },

    // Возвращает имя направления по коду nid
    getNameDirectionByNid(nid) {
        let dir = directions.find(dir => dir.nid == nid );
        return dir ? dir.name : '-';
    }
};

/*
const express = require('express');

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
*/