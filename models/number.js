const { INTEGER, STRING } = require('sequelize');

const db = require('../services/db');

const Number = db.define('number', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    number: { type: STRING(16), unique:true, allowNull: false },
    cid: { type: INTEGER, allowNull: false }
}, {
    timestamps: false,
    getterMethods: {
        numder_custid() {
            return `${this.getDataValue('number')} (${this.getDataValue('cid')})`;
        }
    }
});

module.exports = Number;