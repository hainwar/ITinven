const mongoose = require('mongoose');

const PeminjamanSchema = new mongoose.Schema({
    namaPeminjam: { type: String, required: true },
    alat: { type: String, required: true },
    tanggalPinjam: { type: Date, required: true },
    namaPetugas: { type: String, required: true },
    foto: { type: String, required: true },
});

module.exports = mongoose.model('Peminjaman', PeminjamanSchema);

