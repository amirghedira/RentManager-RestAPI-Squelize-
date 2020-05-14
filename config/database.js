const Sequelize = require('sequelize');


var db = new Sequelize('locationapp', 'root', '96901171amir', {
    host: 'localhost',
    dialect: 'mysql'
});


module.exports = db;