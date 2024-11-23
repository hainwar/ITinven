const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { JWT_SECRET } = process.env;

// Controller untuk registrasi
const register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username dan password wajib diisi.' });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username sudah digunakan.' });
    }

    const user = new User({ username, password });
    await user.save();

    res.status(201).json({ message: 'Registrasi berhasil.' });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan server.', error: error.message });
  }
};

// Controller untuk login
const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username dan password wajib diisi.' });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Username atau password salah.' });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Username atau password salah.' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login berhasil.', token });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan server.', error: error.message });
  }
};

module.exports = { register, login };
