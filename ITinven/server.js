const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./backend/config/database');

// Inisialisasi aplikasi
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Koneksi ke MongoDB
connectDB();

// Route untuk root ("/")
app.get('/', (req, res) => {
    res.send('Selamat datang di API Peminjaman Barang!');
});

// Routes lainnya
app.use('/api/auth', require('./backend/routes/authRoutes'));
app.use('/api/barang', require('./backend/routes/barangRoutes'));
app.use('/api/peminjaman', require('./backend/routes/peminjamanRoutes'));

// Jalankan server
const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});
