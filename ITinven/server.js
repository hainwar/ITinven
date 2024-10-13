const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Koneksi ke MongoDB
mongoose.connect('YOUR_MONGO_DB_CONNECTION_STRING', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

// Schema untuk Peminjaman
const PeminjamanSchema = new mongoose.Schema({
  note: { type: String, required: true },
});

const Peminjaman = mongoose.model('Peminjaman', PeminjamanSchema);

// API endpoint untuk menambahkan data ke MongoDB
app.post('/api/peminjaman', (req, res) => {
  const { note } = req.body;

  const newPeminjaman = new Peminjaman({
    note
  });

  newPeminjaman.save()
    .then(() => res.json('Peminjaman berhasil disimpan!'))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
