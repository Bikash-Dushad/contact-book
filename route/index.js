const express = require("express")
const router = express.Router();
const homecontroller = require('../controller/homecontroller')

router.get('/', homecontroller.layout)
router.use('/user', require('./layout'))
router.use('/auth', require('./auth'));


module.exports = router;