const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://dataBarangITTVRI:RtXdXgr4ebcxYtrP@databarangittvri.wum9i.mongodb.net/myDatabase');
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
