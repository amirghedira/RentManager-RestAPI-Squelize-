const express = require('express');
const carRoutes = require('./routes/car')
const userRoutes = require('./routes/user')
const rentRoutes = require('./routes/rent')
const bodyParser = require('body-parser');
const db = require('./config/database')
const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

db.authenticate()
    .then(result => {
        console.log('connected')

    })
    .catch(err => {
        console.log(err)
    })

app.use(express.static("uploads/"));
app.all("/*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization, Content-Length, X-Requested-With"
    );
    next();
});

app.use('/car', carRoutes);
app.use('/rent', rentRoutes);
app.use('/user', userRoutes)


module.exports = app;