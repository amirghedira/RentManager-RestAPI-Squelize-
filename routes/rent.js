
const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploader')
const rentController = require('../controllers/rent')
const checkAuth = require('../middleware/checkAuth')

router.post('/', checkAuth, rentController.addRent);
router.get('/', rentController.getRents)
router.get('/user/:ncin', rentController.getUserRents)
router.get('/car/:mat', rentController.getCarRents)
router.get('/:ncin/:mat', rentController.getSpecificRent)


module.exports = router;