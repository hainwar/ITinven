const cors = require('cors');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Middleware CORS
router.use(cors());

// Rute untuk registrasi
router.post('/register', async (req, res) => {
  const { email, username, password, confirmPassword } = req.body;
  try {
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Password dan konfirmasi password tidak cocok.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email sudah digunakan.' });
    }

    if (username) {
      const existingUsername = await User.findOne({ username });
      if (existingUsername) {
        return res.status(400).json({ message: 'Username sudah digunakan.' });
      }
    }

    // Hash password sebelum menyimpan
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'Registrasi berhasil.' });
  } catch (err) {
    res.status(500).json({ message: 'Terjadi kesalahan.', error: err.message });
  }
});

module.exports = router;
