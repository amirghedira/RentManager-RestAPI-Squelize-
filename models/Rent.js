const Sequelize = require('sequelize');
const User = require('../models/User');
const Car = require('../models/Car')
const db = require('../config/database')
const rentSchema = db.define('Rent', {
    ncin: {
        type: Sequelize.STRING,
        allowNull: false
    },
    ncinprop: {
        type: Sequelize.STRING,
        allowNull: false
    },
    matricule: {
        type: Sequelize.STRING,
        allowNull: false
    },
    prix: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    duree: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, { timestamps: false })

rentSchema.hasMany(User, { foreignKey: 'ncin', sourceKey: 'ncin' })
User.hasMany(rentSchema, { foreignKey: 'ncin', sourceKey: 'ncin' })

module.exports = rentSchema;