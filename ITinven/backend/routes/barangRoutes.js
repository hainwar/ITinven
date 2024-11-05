const express = require('express');
const { addBarang, getAllBarang } = require('../controllers/barangController');
const router = express.Router();

router.post('/', addBarang);
router.get('/', getAllBarang);

module.exports = router;
