
const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploader')
const carController = require('../controllers/car')
const checkAuth = require('../middleware/checkAuth')


router.get('/', carController.getCars);


router.post('/', checkAuth, upload.single("carimage"), carController.addCar);

router.get('/freecars', carController.getFreeCars);

router.get('/rentedcars', carController.getRentedCars);

router.get('/:mat', carController.getCar);

router.delete('/:mat', checkAuth, carController.deleteCar);

router.patch('/freecar/:mat', checkAuth, carController.freeCar);

//historique d une voiture
router.get('/history/:mat', carController.getCarHistory);


module.exports = router;