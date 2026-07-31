const asyncHandler = require('express-async-handler');
const SensorData = require('../models/SensorData');

// @desc    Simpan data suhu & kelembapan dari ESP32
// @route   POST /api/sensor
const addSensorData = asyncHandler(async (req, res) => {
  const { temperature, humidity } = req.body;

  if (temperature === undefined || humidity === undefined) {
    res.status(400);
    throw new Error('Temperature dan humidity wajib diisi!');
  }

  const newLog = await SensorData.create(Number(temperature), Number(humidity));
  res.status(201).json({
    success: true,
    message: 'Data sensor berhasil dicatat',
    data: newLog
  });
});

// @desc    Ambil riwayat data sensor untuk Frontend
// @route   GET /api/sensor
const getSensorData = asyncHandler(async (req, res) => {
  const logs = await SensorData.getLatest();
  res.status(200).json({
    success: true,
    data: logs
  });
});

module.exports = { addSensorData, getSensorData };