const mongoose = require('mongoose');

const PeminjamanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  alat: { type: String, required: true },
  date: { type: String, required: true },
  petugas: { type: String, required: true },
  photo: { type: String, required: true }, // Path foto
}, { timestamps: true });

module.exports = mongoose.model('Peminjaman', PeminjamanSchema);
