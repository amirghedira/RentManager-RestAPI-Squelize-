const Sequelize = require('sequelize');
const db = require('../config/database')
const carSchema = db.define('Car', {
    matricule: {
        type: Sequelize.STRING
    },
    ncinprop: {
        type: Sequelize.STRING
    },
    marque: {
        type: Sequelize.STRING
    },
    couleur: {
        type: Sequelize.STRING
    },
    prix: {
        type: Sequelize.FLOAT
    },
    etat: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },
    image: {
        type: Sequelize.STRING
    },
    kilometrage: {
        type: Sequelize.INTEGER
    }


}, { timestamps: false })

module.exports = carSchema;