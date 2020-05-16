const bcrypt = require('bcrypt');
const db = require('../config/database')
const User = require('../models/User')
const Rent = require('../models/Rent')
const Car = require('../models/Car')
const fs = require("fs");
const jwt = require('jsonwebtoken')



exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll()

        res.status(200).json({ users: users })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
exports.getUser = async (req, res) => {


    try {
        const user = await User.findOne({ where: { id: req.params.id } })
        if (user)

            res.status(200).json({ user: user.dataValues })

        else
            res.status(404).json({ message: 'user not found' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }


}

exports.getUserByUsername = async (req, res) => {

    try {
        const user = await User.findOne({ where: { username: req.params.username } })
        if (user)

            res.status(200).json({ user: user.dataValues })

        else
            res.status(404).json({ message: 'user not found' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.getUserByNcin = async (req, res) => {
    try {
        const user = await User.findOne({ where: { ncin: req.params.ncin } })
        if (user)

            res.status(200).json({ user: user.dataValues })

        else
            res.status(404).json({ message: 'user not found' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.getUserByEmail = async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.params.email } })
        if (user)

            res.status(200).json({ user: user.dataValues })

        else
            res.status(404).json({ message: 'user not found' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
exports.addUser = async (req, res) => {
    console.log('jjj')
    console.log(req.files[0].filename)
    try {
        const user = await User.findOne({ where: { username: req.body.username } })
        if (!user) {
            const hashedpass = await bcrypt.hash(req.body.password, 11)
            let data = {
                username: req.body.username,
                password: hashedpass,
                email: req.body.email,
                access: req.body.access,
                ncin: req.body.ncin,
                nom: req.body.nom,
                prenom: req.body.prenom,
                age: req.body.age,
                daten: new Date(req.body.daten),
                npermis: req.body.npermis,
                adresse: req.body.adresse,
                num_tel: req.body.num_tel,
                image: req.files[0].filename, // profile image
                bgimage: req.files[2].filename, // background image 
                imagencin: req.files[1].filename,
                joindate: new Date().toISOString()
            }
            const createdUser = await User.create(data)

            res.status(200).json({ User: createdUser })

        } else {
            res.status(409).json({ message: 'user already found' })

        }


    } catch (error) {
        res.status(500).json({ message: error.message });

    }



}

exports.userLogin = async (req, res) => {
    try {
        const user = await User.findOne({ where: { username: req.body.username } })
        if (user) {
            const result = await bcrypt.compare(req.body.password, user.dataValues.password)

            if (result) {
                const token = jwt.sign({ id: user.dataValues.id, username: req.body.username, ncin: user.dataValues.ncin }, process.env.JWT_SECRET_KEY)
                res.status(200).json({ message: 'successfully logged in', token: token });
            } else {
                res.status(400).json({ message: 'login failed' })

            }
        } else {
            res.status(400).json({ message: 'login failed' })
        }
    } catch (error) {

        res.status(500).json({ message: error.message });

    }


}
exports.updateUser = async (req, res) => {

    try {
        await User.update({ username: req.body.username, email: req.body.email }, { where: { username: req.user.username } })
        res.status(200).json({ message: 'user updated successfully' });

    } catch (error) {
        res.status(500).json({ message: error.message });

    }
}

exports.updateUserPassword = async (req, res) => {

    try {
        const hashedpw = await bcrypt.hash(req.body.password, 11);
        await User.update({ password: hashedpw }, { where: { username: req.user.username } })
        res.status(200).json({ message: 'user updated successfully' });

    } catch (error) {
        res.status(500).json({ message: error.message });

    }
}

exports.updateProfileImg = async (req, res) => {

    try {
        const user = await User.findOne({ where: { username: req.user.username } })
        fs.unlink(`./uploads/${user.dataValues.image}`, (err) => {
            if (err) console.log(err)
        });
        await User.update({ image: req.file.filename }, { where: { username: req.user.username } })
        res.status(200).json({ message: 'user updated successfully' });

    } catch (error) {
        res.status(500).json({ message: error.message });

    }
}
exports.getUserHistory = async (req, res) => {

    try {
        const history = await User.findAll({
            include: [{
                model: Rent,
                required: true,
                where: { ncin: req.params.ncin, active: false }
            }]
        })
        res.status(200).json({ history: history });
    } catch (error) {

        res.status(500).json({ message: error.message });

    }
}

exports.updateBackgroundImg = async (req, res) => {

    try {
        const user = await User.findOne({ where: { username: req.user.usernam } })

        fs.unlink(`./uploads/${user.dataValues.bgimage}`, (err) => {
            if (err) console.log(err)
        });

        await User.update({ bgimage: req.file.filename }, { where: { username: req.user.username } })
        res.status(200).json({ message: 'user updated successfully' });

    } catch (error) {
        res.status(500).json({ message: error.message });

    }
}
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findOne({ where: { username: req.params.username } })
        if (user) {
            fs.unlink(`./uploads/${user.dataValues.image}`, (err) => {
                if (err) console.log(err)
            });
            fs.unlink(`./uploads/${user.dataValues.imagencin}`, (err) => {
                if (err) console.log(err)
            });
            fs.unlink(`./uploads/${user.dataValues.bgimage}`, (err) => {
                if (err) console.log(err)
            });
            await User.destroy({ where: { username: req.params.username } })

            res.status(200).json({ message: 'user deleted successfully' });

        } else {
            res.status(404).json({ message: 'user not found' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}