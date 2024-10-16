const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');

// Inisialisasi Aplikasi Express
const app = express();

// Middleware
app.use(express.json()); // Express sudah mendukung body-parser bawaan
app.use(cors());

// Koneksi ke MongoDB
mongoose.connect('mongodb+srv://<dataBarangITTVRI>:RtXdXgr4ebcxYtrP@cluster0.mongodb.net/forloginDB?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log('Connection error:', err.message));

// Konfigurasi penyimpanan untuk foto
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Route GET untuk root URL
app.get('/', (req, res) => {
  res.send('Selamat datang di API Peminjaman Barang');
});

// Rute API Peminjaman
app.use('/api/peminjaman', require('./backend/routes/peminjaman'));

// Rute API Register dan Login
app.use('/api/auth', require('./backend/routes/auth'));  // Ditambahkan untuk handle register dan login

// Endpoint untuk mengunggah gambar
app.post('/api/upload', upload.single('photo'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Foto tidak ditemukan!' });
  }
  res.status(200).json({
    message: 'Foto berhasil diunggah!',
    photoUrl: `/uploads/${req.file.filename}`
  });
});

// Menyajikan folder uploads untuk diakses secara publik
app.use('/uploads', express.static('uploads'));

// Jalankan Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
