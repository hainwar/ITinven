const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Inisialisasi aplikasi Express
const app = express();
app.use(bodyParser.json());
app.use(cors());

// URI MongoDB
const mongoURI = 'mongodb+srv://dataBarangITTVRI:RtXdXgr4ebcxYtrP@databarangittvri.wum9i.mongodb.net/myDatabase?retryWrites=true&w=majority';

// Hubungkan ke MongoDB Atlas
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB Atlas terhubung!'))
    .catch((err) => console.error('Kesalahan koneksi', err));

// Skema dan Model MongoDB untuk Barang
const BarangSchema = new mongoose.Schema({
    nama: String,
    jumlah: Number,
    lokasi: String,
});

const Barang = mongoose.model('Barang', BarangSchema);

// Skema dan Model MongoDB untuk Peminjaman
const PeminjamanSchema = new mongoose.Schema({
    namaPeminjam: String,
    alat: String,
    tanggalPinjam: Date,
    namaPetugas: String,
    foto: String,
});

const Peminjaman = mongoose.model('Peminjaman', PeminjamanSchema);

// Route untuk root (GET /)
app.get('/', (req, res) => {
    res.send('Selamat datang di API Peminjaman Barang!');
});

// Endpoint untuk menyimpan data barang
app.post('/api/barang', async (req, res) => {
    const { nama, jumlah, lokasi } = req.body;
    const newBarang = new Barang({ nama, jumlah, lokasi });
    try {
        await newBarang.save();
        res.status(201).send('Data barang berhasil disimpan.');
    } catch (error) {
        res.status(500).send('Gagal menyimpan data barang.');
    }
});

// Endpoint untuk menyimpan data peminjaman
app.post('/api/peminjaman', async (req, res) => {
    const { namaPeminjam, alat, tanggalPinjam, namaPetugas, foto } = req.body;
    const newPeminjaman = new Peminjaman({ namaPeminjam, alat, tanggalPinjam, namaPetugas, foto });
    try {
        await newPeminjaman.save();
        res.status(201).send('Data peminjaman berhasil disimpan.');
    } catch (error) {
        res.status(500).send('Gagal menyimpan data peminjaman.');
    }
});

// Jalankan server pada port 5000
app.listen(5000, () => {
    console.log('Server berjalan di port 5000');
});
