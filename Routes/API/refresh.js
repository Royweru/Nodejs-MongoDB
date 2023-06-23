const express = require("express");
const router = express.Router();
const refreshTokenC= require('../../Controllers/refreshToken');

router.get('/',refreshTokenC.handleRefreshToken);

module.exports = router;
