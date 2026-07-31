const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const apiRoutes = require('./routes/api');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Inisialisasi Database
connectDB();

// Root Endpoint Test
app.get('/', (req, res) => {
  res.status(200).json({
    message: '🏛️ Smart-Khazanah Vault API Server is Running Active!',
    status: 'OK'
  });
});

// Routing API Utama
app.use('/api', apiRoutes);

// Jalankan Server
app.listen(PORT, () => {
  console.log(`================================================`);
  console.log(`🚀 Server Backend Berjalan di Port: ${PORT}`);
  console.log(`🔗 Test URL: http://localhost:${PORT}`);
  console.log(`================================================`);
});