const Sequelize = require('sequelize');
const cfg = require('../config');

const sequelize = new Sequelize(cfg.auth.base, cfg.auth.login, cfg.auth.password, {
    host: cfg.auth.host,
    dialect: 'mysql'
});

module.exports = sequelize;