const express = require('express');
const router = express.Router();

const loginController = require('../../controllers/login/login.controller');

// Hacer login
router.post('/', loginController.login);

module.exports = router;