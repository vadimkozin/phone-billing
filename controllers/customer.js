const customers = require('../data/customers');

module.exports = {
    // GET /customers - все клиенты
    showCustomers(req, res) {
        res.render('customers', {
            id: 'customers',
            title: '',
            customers
        });
    },

    findCustomer(req, res, next) {
        let id = req.params.id;
        let cust = customers.find(n => n.id == id);

        console.log('cust::',cust, 'id:', id);

        if (!cust) {
            let error = new Error(`Организация c id:${id} НЕ найдена`);
            error.status = 404;
            next(error);
        } else {
            req.customer = cust;

            next();
        }
    
    },

    // GET /customers/1 - клиент с уникальным кодом
    showCustomerById(req, res) {
        res.render('customer', {
            id: 'customer',
            title: req.customer.name,
            customer: req.customer
        });      
    },

    // возвращает имя клиента по его коду
    getNameByCid(id) {
        let cust = customers.find(cust => cust.id == id);
        return cust ? cust.name : '-';
    }

};

/*
// GET /customers/1 - клиент с уникальным кодом
router.get('/:id', (req, res) => {
    let id = req.params.id;
    let cust = customers.find(n => n.id == id);
    let message = (cust != undefined)
        ? cust 
        : `Организация c id:${id} НЕ найдена`;
 
    res.send(message);
});
*/
