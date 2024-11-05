const Barang = require('../models/Barang');

exports.addBarang = async (req, res) => {
    const { nama, jumlah, lokasi } = req.body;
    const newBarang = new Barang({ nama, jumlah, lokasi });

    try {
        await newBarang.save();
        res.status(201).json({ message: 'Data barang berhasil disimpan.', data: newBarang });
    } catch (error) {
        console.error('Error menyimpan data barang:', error);
        res.status(500).json({ message: 'Gagal menyimpan data barang.', error });
    }
};

exports.getAllBarang = async (req, res) => {
    try {
        const barang = await Barang.find();
        res.status(200).json(barang);
    } catch (error) {
        console.error('Error mengambil data barang:', error);
        res.status(500).json({ message: 'Gagal mengambil data barang.', error });
    }
};
