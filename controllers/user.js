const bcrypt = require('bcrypt');
const db = require('../config/database')
const fs = require("fs");
const jwt = require('jsonwebtoken')



exports.getUsers = (req, res) => {

}
exports.getUser = (req, res) => {
    let sql = `SELECT * FROM user WHERE id='${req.params.id}'`;
    db.query(sql, (err, result) => {
        if (err) res.status(500).json({ message: err });
        if (result.length > 0) {
            res.status(200).json({ user: result })
        } else {
            res.status(404).json({ message: 'user not found' });

        }
    });
}

exports.getUserByUsername = (req, res) => {
    let sql = `SELECT * FROM user WHERE username='${req.params.username}'`;
    db.query(sql, (err, result) => {
        if (err) res.status(500).json({ message: err });
        if (result.length > 0) {
            res.status(200).json({ user: result })
        } else {
            res.status(404).json({ message: 'user not found' });

        }

    });
}

exports.getUserByNcin = (req, res) => {
    let sql = `SELECT * FROM user WHERE ncin='${req.params.ncin}'`;
    db.query(sql, (err, result) => {
        if (err) res.status(500).json({ message: err });

        if (result.length > 0) {
            res.status(200).json({ user: result })
        } else {
            res.status(404).json({ message: 'user not found' });

        }
    });
}

exports.getUserByEmail = (req, res) => {
    let sql = `SELECT * FROM user WHERE email='${req.params.email}'`;
    db.query(sql, (err, result) => {
        if (err) res.status(500).json({ message: err });
        if (result.length > 0) {
            res.status(200).json({ user: result })
        } else {
            res.status(404).json({ message: 'user not found' });
        }
    });
}
exports.addUser = (req, res) => {
    bcrypt.hash(req.body.password, 11)
        .then(hashedpass => {
            let post = {
                username: req.body.username,
                password: hashedpass,
                email: req.body.email,
                access: req.body.access,
                ncin: req.body.ncin,
                nom: req.body.nom,
                prenom: req.body.prenom,
                age: req.body.age,
                daten: req.body.daten,
                npermis: req.body.npermis,
                adresse: req.body.adresse,
                num_tel: req.body.num_tel,
                image: req.files[0].filename, // profile image
                bgimage: req.files[2].filename, // background image 
                imagencin: req.files[1].filename,
                joindate: new Date().toISOString()
            };
            let sql = `INSERT into user SET ?`;
            db.query(sql, post, (err, result) => {
                if (err) res.status(500).json({ message: err });
                res.status(200).json({ message: 'user added successfully' });
            });
        })
        .catch(err => {
            res.status(500).json({ message: err });

        })

}

exports.userLogin = (req, res) => {
    let sql = `SELECT * FROM user WHERE username= '${req.body.username}'`;
    db.query(sql, (err, users) => {
        if (err) res.status(500).json({ message: err });
        if (users.length == 1) {
            bcrypt.compare(req.body.password, users[0].password)
                .then(result => {
                    if (result) {
                        const token = jwt.sign({ id: users[0].id, username: req.body.username, ncin: users[0].ncin }, process.env.JWT_SECRET_KEY)
                        res.status(200).json({ message: 'successfully logged in', token: token });
                    } else {
                        res.status(400).json({ message: 'login failed' })

                    }
                })
                .catch(err => {
                    res.status(500).json({ message: err })
                })
        } else {
            res.status(400).json({ message: 'login failed' })
        }
    });
}
exports.updateUser = (req, res) => {
    let sql = `UPDATE user SET username='${req.body.username}',password='${req.body.password}',email='${req.body.email}' WHERE username='${req.body.currentname}'`;
    db.query(sql, (err, result) => {
        if (err) res.status(500).json({ message: err });
        res.status(200).json({ message: 'user updated successfully' });
    });
}
exports.updateProfileImg = (req, res) => {
    let sql = `UPDATE user SET image='${req.body.image}' WHERE username='${req.params.username}'`;
    db.query(sql, (err, result) => {
        if (err) res.status(500).json({ message: err });
        res.status(200).json({ message: 'user updated successfully' });
    });
}
exports.getUserHistory = (req, res) => {
    let sql = `SELECT L.date,L.duree,L.prix,V.matricule,V.marque,V.image
    FROM voiture V , location L
    WHERE L.matricule = V.matricule
    AND L.ncin='${req.params.ncin}'`;
    db.query(sql, (err, result) => {
        if (err) res.status(500).json({ message: err });
        res.status(200).json({ history: result });
    });
}

exports.updateBackgroundImg = (req, res) => {
    let sql = `UPDATE user SET bgimage='${req.body.image}' WHERE username='${req.params.username}'`;
    db.query(sql, (err, result) => {
        if (err) res.status(500).json({ message: err });
        res.status(200).json({ message: 'user updated successfully' });
    });
}
exports.deleteUser = (req, res) => {
    let sql1 = `SELECT * FROM user WHERE username='${req.params.username}'`;
    db.query(sql1, (err, users) => {
        if (err)
            res.status(500).json({ message: err });
        if (users.length > 0) {

            let sql = `DELETE FROM user WHERE username='${req.params.username}'`;
            db.query(sql, req.body.matricule, (err, result) => {
                if (err) res.status(500).json({ message: err });
                fs.unlink(`./uploads/${users[0].image}`, (err) => {
                    if (err) console.log(err)
                });
                fs.unlink(`./uploads/${users[0].imagencin}`, (err) => {
                    if (err) console.log(err)
                });
                fs.unlink(`./uploads/${users[0].bgimage}`, (err) => {
                    if (err) console.log(err)
                });
                res.status(200).json({ message: 'user deleted successfully' });

            });
        } else {
            res.status(404).json({ message: 'user not found' })
        }


    })
}