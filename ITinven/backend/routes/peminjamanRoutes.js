const express = require('express');
const { addPeminjaman, getAllPeminjaman } = require('../controllers/peminjamanController');
const router = express.Router();

router.post('/', addPeminjaman);
router.get('/', getAllPeminjaman);

module.exports = router;
