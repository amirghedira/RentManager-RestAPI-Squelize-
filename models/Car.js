const Sequelize = require('sequelize');
const db = require('../config/database')
const Rent = require('../models/Rent')
const carSchema = db.define('Car', {
    matricule: {
        type: Sequelize.STRING,
        allowNull: false
    },
    ncinprop: {
        type: Sequelize.STRING,
        allowNull: false

    },
    marque: {
        type: Sequelize.STRING,
        allowNull: false

    },
    couleur: {
        type: Sequelize.STRING,
        allowNull: false

    },
    prix: {
        type: Sequelize.FLOAT
    },
    etat: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    image: {
        type: Sequelize.STRING,
        allowNull: false

    },
    kilometrage: {
        type: Sequelize.INTEGER,
        allowNull: false

    }


}, { timestamps: false })

carSchema.hasMany(Rent, { foreignKey: 'matricule', sourceKey: 'matricule' })
Rent.hasMany(carSchema, { foreignKey: 'matricule', sourceKey: 'matricule' })

module.exports = carSchema;