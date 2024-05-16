const express = require('express')
const router = express.Router();
const authcontroller = require('../controller/authcontroller')

router.get('/signuppage', authcontroller.signuppage);
router.get('/signinpage', authcontroller.signinpage);

router.post('/signup', authcontroller.signup);
router.post('/signin', authcontroller.signin)

router.get('/logout', authcontroller.logout)

module.exports = router;