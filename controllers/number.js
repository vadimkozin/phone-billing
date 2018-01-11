const numbers = require('../data/numbers');

module.exports = {
    // GET /numbers - все номера
    showNumbers(req, res) {
        res.render('numbers', {
            id: 'numbers',
            title: 'Список номеров',
            numbers
        });
    },

    // GET /numbers/1 - возвращает номер по уникальному коду (id)
    showNumberById(req, res) {
        res.render('number', {
            id: 'number',
            title: req.number.number,
            number: req.number
        });      
    },

    findNumber(req, res, next) {
        let id = req.params.id;
        let number = numbers.find(n => n.id == id);

        if (!number) {
            let error = new Error(`Номер c id:${id} НЕ найден`);
            error.status = 404;
            next(error);
        } else {
            req.number = number;

            next();
        }
    
    },

};

/*
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
*/