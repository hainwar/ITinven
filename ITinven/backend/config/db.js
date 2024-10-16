const mongoose = require('mongoose');
// Fungsi untuk menghubungkan MongoDB Atlas
const connectDB = async () => {
    try {
      
        // Replace with your non-SRV MongoDB connection string
        await mongoose.connect('mongodb://dataBarangITTVRI:RtXdXgr4ebcxYtrP@cluster0-shard-00-00.mongodb.net:27017,cluster0-shard-00-01.mongodb.net:27017,cluster0-shard-00-02.mongodb.net:27017/myDatabaseName?ssl=true&replicaSet=atlas-abc-shard-0&authSource=admin&retryWrites=true&w=majority');
        console.log('MongoDB connected');
    } catch (err) {
        console.error('Connection error:', err.message);
        process.exit(1); // Stop jika koneksi gagal
    }
};

module.exports = connectDB;
