const customers = require('../data/customers');

// для быстрого отображения кода(id) на название(name) для клиентов
const mapCustomerName = new Map();
for (let cust of customers) {
    mapCustomerName.set(Number(cust.id), cust.name);
}
// mapCustomerName.forEach((v,k) => console.log(k,'=>', v));

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

        if (!cust) {
            let error = new Error(`Организация c id:${id} НЕ найдена`);
            error.status = 404;
            next(error);
        } else {
            req.customer = cust;

            next();
        }
    
    },

    // GET /customers/1 - клиент с уникальным кодом 1
    showCustomerById(req, res) {
        res.render('customer', {
            id: 'customer',
            title: req.customer.name,
            customer: req.customer
        });      
    },

    // возвращает название клиента по его коду
    // getNameByCid(id) {
    //     let cust = customers.find(cust => cust.id == id);
    //     return cust ? cust.name : '-';
    // }

    getNameByCid(id) {
        let name = mapCustomerName.get(Number(id));
        return name ? name : '-';
    }
};
