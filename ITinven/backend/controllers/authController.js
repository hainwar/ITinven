// backend/controllers/authController.js
const User = require('../backend/models/User');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email sudah terdaftar' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'Registrasi berhasil' });
    } catch (error) {
        console.error('Error registrasi:', error);
        res.status(500).json({ message: 'Gagal registrasi', error });
    }
};
