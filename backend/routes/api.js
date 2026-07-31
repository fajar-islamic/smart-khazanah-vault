const express = require('express');
const router = express.Router();

const { addSensorData, getSensorData } = require('../controllers/sensorController');
const { handleDoorAccess, getDoorLogs } = require('../controllers/doorController');
const { askKhazanahAI, getChatHistory } = require('../controllers/aiController');

// Routes Sensor Suhu & Kelembapan
router.post('/sensor', addSensorData);
router.get('/sensor', getSensorData);

// Routes Kontrol Akses & Log Pintu
router.post('/door/access', handleDoorAccess);
router.get('/door/logs', getDoorLogs);

// Routes Khazanah-AI Chatbot
router.post('/ai/chat', askKhazanahAI);
router.get('/ai/history', getChatHistory);

module.exports = router;