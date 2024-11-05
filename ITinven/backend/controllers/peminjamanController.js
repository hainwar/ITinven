const Peminjaman = require('../models/Peminjaman');

exports.addPeminjaman = async (req, res) => {
    const { namaPeminjam, alat, tanggalPinjam, namaPetugas, foto } = req.body;
    const newPeminjaman = new Peminjaman({ namaPeminjam, alat, tanggalPinjam, namaPetugas, foto });

    try {
        await newPeminjaman.save();
        res.status(201).json({ message: 'Data peminjaman berhasil disimpan.', data: newPeminjaman });
    } catch (error) {
        console.error('Error menyimpan data peminjaman:', error);
        res.status(500).json({ message: 'Gagal menyimpan data peminjaman.', error });
    }
};

exports.getAllPeminjaman = async (req, res) => {
    try {
        const peminjaman = await Peminjaman.find();
        res.status(200).json(peminjaman);
    } catch (error) {
        console.error('Error mengambil data peminjaman:', error);
        res.status(500).json({ message: 'Gagal mengambil data peminjaman.', error });
    }
};
