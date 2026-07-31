const asyncHandler = require('express-async-handler');
const AccessLog = require('../models/AccessLog');

// @desc    Proses scan kartu RFID dari ESP32 atau Buka dari Web
// @route   POST /api/door/access
const handleDoorAccess = asyncHandler(async (req, res) => {
  const { uid, userName, action } = req.body;

  // Contoh simpel simulasi hak akses UID
  // Dalam real-case, UID ini nanti disesuaikan dengan e-KTP / Kartu Santri
  let status = 'DENIED';
  let user = userName || 'Tamu / Tanpa Nama';

  if (uid === 'MASTER_RFID_123' || action === 'REMOTE_UNLOCK_WEB') {
    status = 'GRANTED';
    user = userName || 'Pengurus Vault';
  }

  const log = await AccessLog.create(uid || 'N/A', user, action || 'SCAN_RFID', status);

  res.status(200).json({
    success: status === 'GRANTED',
    message: status === 'GRANTED' ? 'Akses Diterima! Pintu Terbuka.' : 'Akses Ditolak!',
    data: log
  });
});

// @desc    Ambil riwayat log akses pintu
// @route   GET /api/door/logs
const getDoorLogs = asyncHandler(async (req, res) => {
  const logs = await AccessLog.getHistory();
  res.status(200).json({
    success: true,
    data: logs
  });
});

module.exports = { handleDoorAccess, getDoorLogs };