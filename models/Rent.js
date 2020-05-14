const Sequelize = require('sequelize');
const db = require('../config/database')
const rentSchema = db.define('Rent', {
    ncin: {
        type: Sequelize.STRING
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
    }
}, { timestamps: false })

module.exports = rentSchema;