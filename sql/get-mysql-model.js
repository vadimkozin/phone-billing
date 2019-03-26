// npm install --save-dev sequelize-mysql-model
var SequelizeAuto = require('sequelize-mysql-model')

var db = {
    host: 'localhost',
    user: 'root',
    password: '19',
    database: 'blog',
    port: '3306'
};

var auto = new SequelizeAuto(db.database, db.user, db.password, {
    host: db.host,
    dialect: 'mysql',
    port: db.port,
    directory: './x_models',
    additional: {
        timestamps: false
    },
    tables: ['x_numbers', 'x_customers'],
    modelNameResolve: function (table_name) {
        if (table_name.indexOf("x_") !== -1) {
            return table_name.substring(2)
        } else {
            return table_name
        }
    },
    fileNameResolve: function (table_name) {
        if (table_name.indexOf("x_") !== -1) {
            return table_name.substring(2)
        } else {
            return table_name
        }
    }
});

auto.run(function (err) {
    if (err) throw err;

    console.log(auto.tables); // table list
    console.log(auto.foreignKeys); // foreign key list
});