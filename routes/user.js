const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploader')
const userController = require('../controllers/user')
const checkAuth = require('../middleware/checkAuth')
router.post('/', upload.array('profileimages', 4), userController.addUser);

router.get('/', userController.getUsers);
router.get("/:id", userController.getUser);
router.get('/ncin/:ncin', userController.getUserByNcin);
router.get("/username/:username", userController.getUserByUsername);

router.get("/email/:email", userController.getUserByEmail);
router.post("/login", userController.userLogin);
router.patch("/updateuser", checkAuth, userController.updateUser);

router.patch("/updateprofileimage/:username/", checkAuth, userController.updateProfileImg);
router.patch("/updatebgimage/:username/", checkAuth, userController.updateBackgroundImg);
//historique du user

router.get("/history/:ncin", userController.getUserHistory);

router.delete("/:username", checkAuth, userController.deleteUser)

module.exports = router;
