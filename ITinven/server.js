const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs'); // Untuk hash password

// Inisialisasi aplikasi Express
const app = express();
app.use(bodyParser.json());
app.use(cors());

// URI MongoDB
const mongoURI = 'mongodb+srv://dataBarangITTVRI:RtXdXgr4ebcxYtrP@databarangittvri.wum9i.mongodb.net/myDatabase?retryWrites=true&w=majority';

// Hubungkan ke MongoDB Atlas tanpa opsi deprecated
mongoose.connect(mongoURI)
    .then(() => {
        console.log('MongoDB Atlas terhubung!');

        // Jalankan server setelah koneksi ke MongoDB berhasil
        app.listen(8000, () => {
            console.log('Server berjalan di port 8000');
        });
    })
    .catch((err) => console.error('Kesalahan koneksi:', err));

// Skema dan Model MongoDB untuk Barang
const BarangSchema = new mongoose.Schema({
    nama: { type: String, required: true },
    jumlah: { type: Number, required: true },
    lokasi: { type: String, required: true },
});

const Barang = mongoose.model('Barang', BarangSchema);

// Skema dan Model MongoDB untuk Peminjaman
const PeminjamanSchema = new mongoose.Schema({
    namaPeminjam: { type: String, required: true },
    alat: { type: String, required: true },
    tanggalPinjam: { type: Date, required: true },
    namaPetugas: { type: String, required: true },
    foto: { type: String, required: true },
});

const Peminjaman = mongoose.model('Peminjaman', PeminjamanSchema);

// Skema dan Model MongoDB untuk User
const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const User = mongoose.model('User', UserSchema);

// Endpoint untuk registrasi pengguna baru
app.post('/api/auth/register', async (req, res) => {
    const { email, password } = req.body;
    
    try {
        // Periksa apakah email sudah digunakan
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email sudah terdaftar' });
        }

        // Hash password untuk keamanan
        const hashedPassword = await bcrypt.hash(password, 10);

        // Buat pengguna baru
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'Registrasi berhasil' });
    } catch (error) {
        console.error('Error registrasi:', error);
        res.status(500).json({ message: 'Gagal registrasi', error });
    }
});

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
        console.log('Data barang berhasil disimpan:', newBarang);
        res.status(201).json({ message: 'Data barang berhasil disimpan.', data: newBarang });
    } catch (error) {
        console.error('Error menyimpan data barang:', error);
        res.status(500).json({ message: 'Gagal menyimpan data barang.', error });
    }
});

// Endpoint untuk menyimpan data peminjaman
app.post('/api/peminjaman', async (req, res) => {
    const { namaPeminjam, alat, tanggalPinjam, namaPetugas, foto } = req.body;
    const newPeminjaman = new Peminjaman({ namaPeminjam, alat, tanggalPinjam, namaPetugas, foto });
    try {
        await newPeminjaman.save();
        console.log('Data peminjaman berhasil disimpan:', newPeminjaman);
        res.status(201).json({ message: 'Data peminjaman berhasil disimpan.', data: newPeminjaman });
    } catch (error) {
        console.error('Error menyimpan data peminjaman:', error);
        res.status(500).json({ message: 'Gagal menyimpan data peminjaman.', error });
    }
});

// Endpoint untuk mendapatkan semua data barang
app.get('/api/barang', async (req, res) => {
    try {
        const barang = await Barang.find();
        console.log('Mengambil data barang:', barang);
        res.status(200).json(barang);
    } catch (error) {
        console.error('Error mengambil data barang:', error);
        res.status(500).json({ message: 'Gagal mengambil data barang.', error });
    }
});

// Endpoint untuk mendapatkan semua data peminjaman
app.get('/api/peminjaman', async (req, res) => {
    try {
        const peminjaman = await Peminjaman.find();
        console.log('Mengambil data peminjaman:', peminjaman);
        res.status(200).json(peminjaman);
    } catch (error) {
        console.error('Error mengambil data peminjaman:', error);
        res.status(500).json({ message: 'Gagal mengambil data peminjaman.', error });
    }
});
