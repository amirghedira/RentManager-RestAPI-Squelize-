const db = require('../config/database')
const Car = require('../models/Car')
const fs = require('fs')
exports.getCars = (req, res) => {

    Car.findAll({})
        .then(data => {
            res.status(200).json({ cars: data });

        })
        .catch(err => {
            res.status(400).json({ message: err.message })
            console.log(err)
        })
}

exports.getCar = (req, res) => {
    let sql = `SELECT * FROM voiture where matricule ='${req.params.mat}'`;
    db.query(sql, (err, result) => {
        if (err) res.status(500).json({ message: err });
        res.status(200).json({ car: result });
    });
}

exports.addCar = (req, res) => {
    let sql = "SELECT * FROM voiture where matricule=?";
    db.query(sql, req.body.matricule, (err, result) => {
        if (err) res.status(500).json({ message: err });
        if (result.length == 0) {
            let post = {
                matricule: req.body.matricule,
                marque: req.body.marque,
                couleur: req.body.couleur,
                prix: req.body.prix,
                kilometrage: req.body.kilometrage,
                etat: 'L',//libre
                image: req.file.filename,
                ncinprop: req.user.ncin
            };
            let sql = "INSERT INTO voiture SET ?";
            db.query(sql, post, (err, result) => {
                if (err) res.status(500).json({ message: err });
                res.status(200).json({ message: 'car successfully added' })
            });
        } else {
            res.status(409).json({ message: 'car already exists' });
        }
    });
}

exports.getFreeCars = (req, res) => {
    let sql = "SELECT * FROM voiture where `etat`='L'";
    db.query(sql, (err, result) => {
        if (err) res.status(500).json({ message: err });
        res.status(200).json({ freecars: result });
    });
}

exports.getRentedCars = (req, res) => {
    let sql = "SELECT * FROM voiture WHERE `etat`='O'";
    db.query(sql, (err, result) => {
        if (err) res.status(500).json({ message: err });
        res.status(200).json({ rentedcars: result })
    });
}

exports.deleteCar = (req, res) => {
    let sql = `SELECT * FROM voiture WHERE matricule ='${req.params.mat}'`;
    db.query(sql, (err, cars) => {
        if (err)
            throw new Error(err)
        let sql2 = `DELETE FROM voiture WHERE matricule='${req.params.mat}'`;
        db.query(sql2, (err, result) => {
            if (err) throw new Error(err)

            fs.unlink(`./uploads/${cars[0].image}`, (err) => {
                if (err) console.log(err)
            });

            res.status(200).json({ message: 'car successfully deleted' })
        });
    })
}


exports.freeCar = (req, res) => {
    let sql = `UPDATE voiture SET etat='L' WHERE matricule = '${req.params.mat}'`;
    db.query(sql, (err, result) => {
        if (err) res.status(500).json({ message: err });
        res.status(200).json({ message: 'car successully updated' })
    });
}

exports.getCarHistory = (req, res) => {
    let sql = `SELECT U.ncin,U.nom,U.prenom,U.num_tel,U.image,U.imagencin,L.date,L.prix,L.duree
    FROM user U , location L
    WHERE L.ncin = U.ncin
    AND L.matricule='${req.params.mat}'`;
    db.query(sql, (err, result) => {
        if (err) res.status(500).json({ message: err });
        res.status(200).json({ history: result })
    });
}