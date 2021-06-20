// other libraries importing
const express = require('express');

// self created function/files/classes
const userController = require('../controllers/user-controller');


const router = express.Router();


router.post("/signup", userController.userSignup);

router.post("/login", userController.userLogin);

router.post("/getInfo/:userName/:userAge", userController.userInfo);


module.exports = router;