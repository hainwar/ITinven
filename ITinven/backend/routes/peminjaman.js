const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Inisialisasi aplikasi Express
const app = express();
app.use(express.json());
app.use(cors());

// Koneksi ke MongoDB
mongoose.connect('mongodb+srv://<dataBarangITTVRI>:RtXdXgr4ebcxYtrP@cluster0.mongodb.net/forloginDB?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log('Connection error:', err.message));

// Definisikan Skema Peminjaman
const PeminjamanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  alat: { type: String, required: true },
  petugas: { type: String, required: true },
  date: { type: String, required: true },
  photo: { type: String }, // URL foto yang diunggah
  createdAt: { type: Date, default: Date.now }
});

// Buat model Mongoose dari skema
const Peminjaman = mongoose.model('Peminjaman', PeminjamanSchema);

// POST: Tambah Data Peminjaman
app.post('/api/peminjaman', async (req, res) => {
  const { name, alat, petugas, date, photo } = req.body;

  try {
    const newPeminjaman = new Peminjaman({ name, alat, petugas, date, photo });
    await newPeminjaman.save();
    res.status(200).json({ message: 'Data peminjaman berhasil disimpan!' });
  } catch (error) {
    res.status(500).json({ message: 'Gagal menyimpan data.' });
  }
});

// GET: Ambil Semua Data Peminjaman
app.get('/api/peminjaman', async (req, res) => {
  try {
    const peminjaman = await Peminjaman.find();
    res.status(200).json(peminjaman);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil data.' });
  }
});

// Jalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
