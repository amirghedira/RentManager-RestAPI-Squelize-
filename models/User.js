const Sequelize = require('sequelize');

const db = require('../config/database')
const userSchema = db.define('User', {
    username: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    access: {
        type: Sequelize.STRING
    },
    ncin: {
        type: Sequelize.STRING
    },
    nom: {
        type: Sequelize.STRING
    },
    prenom: {
        type: Sequelize.STRING
    },
    age: {
        type: Sequelize.INTEGER
    },
    daten: {
        type: Sequelize.DATEONLY
    },
    adresse: {
        type: Sequelize.STRING
    },
    num_tel: {
        type: Sequelize.STRING
    },
    npermis: {
        type: Sequelize.STRING
    },
    image: {
        type: Sequelize.STRING
    },
    imagencin: {
        type: Sequelize.STRING
    },
    bgimage: {
        type: Sequelize.STRING
    },
    joindate: {
        type: Sequelize.DATEONLY
    },
}, { timestamps: false })


module.exports = userSchema;