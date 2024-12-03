const Peminjaman = require('../models/Peminjaman');

exports.getHistory = async (req, res) => {
    try {
        const { userId } = req.params; // Ambil userId dari parameter URL

        // Validasi userId
        if (!userId) {
            return res.status(400).json({ message: 'User ID tidak diberikan.' });
        }

        // Query database untuk riwayat peminjaman berdasarkan userId
        const history = await Peminjaman.find({ user: userId }).sort({ date: -1 });

        if (!history || history.length === 0) {
            return res.status(404).json({ message: 'Tidak ada riwayat ditemukan.' });
        }

        // Mengembalikan response dengan status 200 dan data riwayat
        res.status(200).json({
            message: 'Riwayat berhasil diambil.',
            data: history,
        });
    } catch (error) {
        console.error('Error saat mengambil riwayat:', error.message);
        // Mengembalikan response dengan status 500 jika terjadi kesalahan server
        res.status(500).json({ message: 'Terjadi kesalahan server.', error: error.message });
    }
};
