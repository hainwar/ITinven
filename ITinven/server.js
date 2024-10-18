const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Inisialisasi aplikasi Express
const app = express();
app.use(bodyParser.json());

// Ganti URI ini dengan URI Anda sendiri dari MongoDB Atlas
const mongoURI = 'mongodb+srv://dataBarangITTVRI:RtXdXgr4ebcxYtrP@databarangittvri.wum9i.mongodb.net/?retryWrites=true&w=majority';

// Hubungkan ke MongoDB Atlas (hapus opsi yang tidak diperlukan)
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB Atlas connected!'))
    .catch((err) => console.error('Connection error', err));

// Skema dan Model MongoDB
const BarangSchema = new mongoose.Schema({
    nama: String,
    jumlah: Number,
    lokasi: String,
});

const Barang = mongoose.model('Barang', BarangSchema);

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

// Jalankan server pada port 5000
app.listen(5000, () => {
    console.log('Server berjalan di port 5000');
});
