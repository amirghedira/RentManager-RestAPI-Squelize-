
const db = require('../config/database')


exports.addRent = (req, res) => {
    date = new Date();
    let sqlfetch = "SELECT * FROM voiture WHERE `matricule`= ? and `etat`= 'L' ";
    db.query(sqlfetch, req.body.matricule, (err, cars) => {
        if (err) throw err;
        if (cars.length > 0) {
            let post = {
                ncin: req.user.ncin,
                ncinprop: cars[0].ncinprop,
                matricule: req.body.matricule,
                duree: req.body.duree,
                prix: 80,
                date: date,
            };
            let sql = "INSERT INTO location SET ?";
            db.query(sql, post, (err, result) => {
                if (err) throw err;
                let sqlupdate = "UPDATE `voiture` SET `etat`='O' WHERE `matricule` = ?";
                db.query(sqlupdate, req.body.matricule, (err, result) => {
                    if (err) throw err;
                    res.status(200).json({ message: 'rent successfully added' });

                });
            });

        } else {
            res.status(409).json({ message: 'Car is not free' });
        }
    });
}

exports.getRents = (req, res) => {
    let sql = "SELECT * FROM location";
    db.query(sql, (err, result) => {
        if (err)
            res.status(500).json({ message: err })
        res.status(200).json({ rents: result })
    })
}

exports.getSpecificRent = (req, res) => {
    let sql = `SELECT * FROM location WHERE ncin=${req.params.ncin} and matricule=${req.params.mat} `
    db.query(sql, (err, result) => {
        if (err)
            res.status(500).json({ message: err })
        res.status(200).json({ rents: result })
    })
}
exports.getUserRents = (req, res) => {
    let sql = `SELECT * FROM location WHERE ncin=${req.params.ncin}`
    db.query(sql, (err, result) => {
        if (err)
            res.status(500).json({ message: err })
        res.status(200).json({ rents: result })
    })
}

exports.getCarRents = (req, res) => {
    let sql = `SELECT * FROM location WHERE matricule=${req.params.mat} `
    db.query(sql, (err, result) => {
        if (err)
            res.status(500).json({ message: err })
        res.status(200).json({ rents: result })
    })
}