// routes/peminjamanRoutes.js
const express = require('express');
const router = express.Router();
const Peminjaman = require('../models/Peminjaman');

// Route untuk menambahkan peminjaman
router.post('/', async (req, res) => {
  try {
    // Menambahkan log untuk melihat data yang diterima
    console.log('Data yang diterima:', req.body); 

    const { name, alat, date, petugas, photo } = req.body;

    // Buat instansi baru dari model Peminjaman
    const peminjaman = new Peminjaman({
      name,
      alat,
      date,
      petugas,
      photo,
    });

    // Simpan peminjaman ke MongoDB
    await peminjaman.save();

    // Log setelah peminjaman berhasil disimpan
    console.log('Peminjaman berhasil disimpan:', peminjaman); 

    // Kirimkan respons sukses
    res.status(201).json({
      message: 'Peminjaman berhasil disimpan!',
      data: peminjaman
    });
  } catch (error) {
    // Menambahkan log untuk error jika terjadi masalah
    console.error('Error:', error); 
    res.status(500).json({ message: 'Terjadi kesalahan saat menyimpan data.', error: error.message });
  }
});

module.exports = router;
