const Sequelize = require('sequelize');
const User = require('../models/User');
const Car = require('../models/Car')
const db = require('../config/database')
const rentSchema = db.define('Rent', {
    ncin: {
        type: Sequelize.STRING

    },
    ncinprop: {
        type: Sequelize.STRING

    },
    matricule: {
        type: Sequelize.STRING,
    },
    prix: {
        type: Sequelize.FLOAT
    },
    duree: {
        type: Sequelize.INTEGER
    },
    date: {
        type: Sequelize.DATE
    }
}, { timestamps: false })

rentSchema.hasMany(User, { foreignKey: 'ncin', sourceKey: 'ncin' })
rentSchema.hasMany(Car, { foreignKey: 'matricule', sourceKey: 'matricule' })


module.exports = rentSchema;