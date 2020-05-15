const Car = require('../models/Car')
const User = require('../models/User')
const Rent = require('../models/Rent')
const fs = require('fs')
exports.getCars = async (req, res) => {

    try {

        const cars = await Car.findAll()
        res.status(200).json({ cars: cars });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getCar = async (req, res) => {

    try {
        const car = await Car.findOne({ where: { matricule: req.params.mat } })
        res.status(200).json({ car: car });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.addCar = async (req, res) => {

    try {
        const car = await Car.findOne({ where: { matricule: req.body.matricule } })
        if (!car) {
            let data = {
                matricule: req.body.matricule,
                marque: req.body.marque,
                couleur: req.body.couleur,
                prix: req.body.prix,
                kilometrage: req.body.kilometrage,
                image: req.file.filename,
                ncinprop: req.user.ncin
            };
            await Car.create(data)
            res.status(200).json({ message: 'car successfully added' })

        } else
            res.status(409).json({ message: 'car already exists' });


    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

exports.getFreeCars = async (req, res) => {
    try {
        const freeCars = await Car.findAll({ where: { etat: true } })
        res.status(200).json({ freeCars: freeCars });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getRentedCars = async (req, res) => {
    try {
        const rentedCars = await Car.findAll({ where: { etat: false } })
        res.status(200).json({ rentedCars: rentedCars });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.deleteCar = async (req, res) => {

    try {
        const car = await Car.findOne({ where: { matricule: req.params.mat } })
        if (car) {
            fs.unlink(`./uploads/${car.dataValues.image}`, (err) => {
                if (err) console.log(err)
            });
            await Car.destroy({ where: { matricule: req.params.mat } })
            res.status(200).json({ message: 'car successfully deleted' })

        }
        else
            res.status(404).json({ message: 'car not found' });

    } catch (error) {

        res.status(500).json({ message: error.message });

    }
}


exports.freeCar = async (req, res) => {
    try {
        await Car.update({ etat: true }, { where: { matricule: req.params.mat } })
        res.status(200).json({ message: 'car successully updated' })

    } catch (error) {
        res.status(500).json({ message: error.message });

    }
}

exports.getCarHistory = async (req, res) => {

    try {
        const history = await Rent.findAll({
            include: [{
                model: User,
                required: true,
                where: { ncin: req.user.ncin }
            }]
        })
        res.status(200).json({ carHistory: history })

    } catch (error) {

        res.status(500).json({ message: error.message });

    }
}