const db = require('../services/db');

const Number = require('./number');
const Customer = require('./customer');

Number.hasOne(Customer);
Customer.belongsTo(Number);

db.sync({ force: true });

module.exports = {
    Number,
    Customer
};