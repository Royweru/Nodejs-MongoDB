const express = require("express");
const router = express.Router();
const authController= require('../../Controllers/authController');

router.use('/',authController.handleLogin);

module.exports = router;