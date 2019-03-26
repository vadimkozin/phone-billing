const { STRING, INTEGER, DATEONLY } = require('sequelize');

const db = require('../services/db');

const Customer = db.define('customer', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    name: { type: STRING, allowNull: false },
    alias: { type: STRING, allowNull: false, defaultValue: '-' },
    inn: { type: STRING(20), allowNull: false, defaultValue: '-'},    
    date: { type: DATEONLY, allowNull: false }
}, {
    timestamps: false,
    getterMethods: {
        preview() {
            let name = this.getDataValue('name');

            return name.length > 30 ? name.substr(0, 30) + '...' : name;
        }
    }
});

module.exports = Customer;