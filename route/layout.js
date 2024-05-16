const express = require("express")
const router = express.Router();
const homecontroller = require('../controller/homecontroller')

router.get('/layout', homecontroller.layout)
router.post('/addDetails', homecontroller.addDetails)


module.exports = router;