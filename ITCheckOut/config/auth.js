const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Akses ditolak. Token tidak ditemukan.' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded; // Simpan data pengguna di request
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token tidak valid.' });
  }
};

module.exports = authenticate;
