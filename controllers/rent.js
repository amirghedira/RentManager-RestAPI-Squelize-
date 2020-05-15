
const Rent = require('../models/Rent')
const Car = require('../models/Car')


exports.addRent = async (req, res) => {

    try {
        const car = await Car.findOne({ where: { matricule: req.body.matricule, etat: true } })
        if (car) {
            const data = {
                ncin: req.user.ncin,
                ncinprop: car.dataValues.ncinprop,
                matricule: req.body.matricule,
                duree: req.body.duree,
                prix: car.dataValues.prix * req.body.duree,
                date: new Date().toISOString(),
            };
            await Rent.create(data);
            await Car.update({ etat: false }, { where: { matricule: req.body.matricule } })
            res.status(200).json({ message: 'rent successfully added' });

        }
        else
            res.status(409).json({ message: 'Car is not free or not found' });

    } catch (error) {
        res.status(500).json({ message: error.message });

    }
}

exports.getRents = async (req, res) => {

    try {
        const rents = await Rent.findAll()
        res.status(200).json({ rents: rents });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getSpecificRent = async (req, res) => {
    try {
        const rent = await Rent.findOne({ where: { ncin: req.params.ncin, matricule: req.params.mat } })
        res.status(200).json({ rent: rent });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
exports.getUserRents = async (req, res) => {
    try {
        const userRents = await Rent.findAll({ where: { ncin: req.params.ncin } })
        res.status(200).json({ userRents: userRents });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getCarRents = async (req, res) => {

    try {
        const carRents = await Rent.findAll({ where: { matricule: req.params.mat } })
        res.status(200).json({ carRents: carRents });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}