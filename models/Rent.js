const Sequelize = require('sequelize');
const User = require('../models/User');
const Car = require('../models/Car')
const db = require('../config/database')
const rentSchema = db.define('Rent', {
    ncin: {
        type: Sequelize.STRING,

    },
    ncinprop: {
        type: Sequelize.STRING
    },
    matricule: {
        type: Sequelize.STRING
    },
    prix: {
        type: Sequelize.FLOAT
    },
    duree: {
        type: Sequelize.INTEGER
    },
    date: {
        type: Sequelize.DATE
    },
    active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    }
}, { timestamps: false })

rentSchema.hasMany(User, { foreignKey: 'ncin', sourceKey: 'ncin' })
User.hasMany(rentSchema, { foreignKey: 'ncin', sourceKey: 'ncin' })

module.exports = rentSchema;