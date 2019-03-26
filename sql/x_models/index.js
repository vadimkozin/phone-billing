const db = require('../../services/db'); 
//const DataTypes = { STRING, INTEGER, DATEONLY, CHAR } = require('sequelize');
const DataTypes  = require('sequelize').DataTypes;
DataTypes.TIMESTAMP = require('sequelize-mysql-timestamp')(db);

const Number2 = require('./numbers')(db, DataTypes);
const Customer2 = require('./customers')(db, DataTypes);

Number2.hasOne(Customer2);
Customer2.belongsTo(Number2);

db.sync({ force: true });

module.exports = {
    Number2,
    Customer2
};