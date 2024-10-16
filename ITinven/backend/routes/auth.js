// routes/auth.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Mengasumsikan model User ada
require('dotenv').config(); // Untuk menggunakan variabel lingkungan

// Route untuk Register
router.post('./frontend /Register', async (req, res) => {
  const { username, password } = req.body;

  // Validasi input
  if (!username || !password) {
    return res.status(400).json({ message: 'Username dan password harus diisi' });
  }

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cek apakah username sudah ada
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username sudah terdaftar' });
    }

    // Simpan user baru
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User berhasil didaftarkan' });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan saat mendaftarkan user', error: error.message });
  }
});

// Route untuk Login
router.post('./frontend /Login', async (req, res) => {
  const { username, password } = req.body;

  // Validasi input
  if (!username || !password) {
    return res.status(400).json({ message: 'Username dan password harus diisi' });
  }

  try {
    // Cek apakah username ada di database
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'User tidak ditemukan' });
    }

    // Cocokkan password yang di-hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Password salah' });
    }

    // Buat token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });

    res.json({ token, message: 'Login berhasil' });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan saat login', error: error.message });
  }
});

module.exports = router;
