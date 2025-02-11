const express = require('express');
const router = express.Router();
const { generateToken } = require('../controllers/authController');

router.post('/token', generateToken);

module.exports = router;