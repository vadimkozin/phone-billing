const { Number, Customer } = require('../models');

console.log('CUSTOMER:', Customer);
console.log('NUMBER:', Number);

module.exports = {
    showNumbers(req, res, next) {
        Number.findAll() 
            .then(numbers => {
                res.render('numbers/view', {
                    title: 'Номера',
                    numbers

                });
            })
            .catch(next);
    }
}