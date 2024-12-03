const express = require('express');
const router = express.Router();
const historyController = require('../controllers/historyController');

// Route untuk mendapatkan riwayat peminjaman berdasarkan userId
router.get('/:userId', historyController.getHistory);

module.exports = router;
