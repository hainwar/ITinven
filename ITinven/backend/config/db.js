const mongoose = require('mongoose');

// Fungsi untuk menghubungkan MongoDB Atlas dengan connection string SRV
const connectDB = async () => {
    try {
        // Use your MongoDB SRV connection string here
        await mongoose.connect('mongodb+srv://dataBarangITTVRI:RtXdXgr4ebcxYtrP@databarangittvri.wum9i.mongodb.net/myDatabaseName?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            appName: 'dataBarangITTVRI' // Optional: Setting appName
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error('Connection error:', err.message);
        process.exit(1); // Stop if the connection fails
    }
};

module.exports = connectDB;
