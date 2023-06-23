const express = require('express');
const router = express.Router()
const registerController = require('../../Controllers/registerController');

router.use('/',registerController.handleNewUser);

module.exports= router;