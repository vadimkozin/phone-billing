const numbers = require('../data/numbers');
const customer = require('./customer');

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

    // GET /numbers/customers/1 - возвращает все номера для клиента с кодом 1
    showNumbersForCustomer(req, res) {
        let cid = req.params.cid;
        let numbersForCustomer = numbers.filter(n => n.cid == cid);
        console.log('cid:', cid, numbersForCustomer);
        //res.send(numbersForCustomer);

        res.render('numbers', {
            id: 'numbers',
            title: `Список номеров для: ${customer.getNameByCid(cid)} (${cid})`,
            numbers: numbersForCustomer
        });


    }
};
