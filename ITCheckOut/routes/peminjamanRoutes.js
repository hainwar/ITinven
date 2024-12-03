const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Konfigurasi multer untuk menyimpan file di folder uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Filter tipe file untuk memastikan hanya gambar yang diunggah
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('File harus berupa gambar'), false);
  }
};

const upload = multer({ storage, fileFilter });

// Model Mongoose
const Peminjaman = require('../models/Peminjaman');

// Rute untuk menambahkan peminjaman baru
router.post('/', upload.single('photo'), async (req, res) => {
  try {
    const { name, alat, date, petugas } = req.body;

    // Validasi
    if (!name || !alat || !date || !petugas || !req.file) {
      return res.status(400).json({ message: 'Semua field wajib diisi dan foto harus diunggah.' });
    }

    // Buat dokumen baru
    const newPeminjaman = new Peminjaman({
      name,
      alat,
      date,
      petugas,
      photo: `/uploads/${req.file.filename}`, // Simpan path foto
    });

    await newPeminjaman.save();

    res.status(201).json({ message: 'Peminjaman berhasil ditambahkan.', data: newPeminjaman });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan saat menyimpan peminjaman.', error: error.message });
  }
});

module.exports = router;
