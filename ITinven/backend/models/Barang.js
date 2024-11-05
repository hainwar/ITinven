const mongoose = require('mongoose');

const BarangSchema = new mongoose.Schema({
    nama: { type: String, required: true },
    jumlah: { type: Number, required: true },
    lokasi: { type: String, required: true },
});

module.exports = mongoose.model('Barang', BarangSchema);
