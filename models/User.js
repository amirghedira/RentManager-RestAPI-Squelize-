const Sequelize = require('sequelize');
const Rent = require('../models/Rent')
const db = require('../config/database')
const userSchema = db.define('User', {
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    access: {
        type: Sequelize.STRING,
        allowNull: false
    },
    ncin: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nom: {
        type: Sequelize.STRING,
        allowNull: false
    },
    prenom: {
        type: Sequelize.STRING,
        allowNull: false
    },
    age: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    daten: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    adresse: {
        type: Sequelize.STRING,
        allowNull: false
    },
    num_tel: {
        type: Sequelize.STRING,
        allowNull: false
    },
    npermis: {
        type: Sequelize.STRING,
        allowNull: false
    },
    image: {
        type: Sequelize.STRING,
        allowNull: false
    },
    imagencin: {
        type: Sequelize.STRING,
        allowNull: false
    },
    bgimage: {
        type: Sequelize.STRING,
        allowNull: false
    },
    joindate: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
}, { timestamps: false })
module.exports = userSchema;