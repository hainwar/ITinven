const express = require('express');
const { register } = require('../controllers/authController'); // Pastikan jalur ini benar
const router = express.Router();

router.post('/register', register);

module.exports = router;
