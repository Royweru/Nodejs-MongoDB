const express = require("express");
const router = express.Router();
const Logout= require('../../Controllers/LogoutController');

router.get('/',Logout.handleLogout);

module.exports = router;
