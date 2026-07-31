const connectDB = require('../config/db');

class SensorData {
  // Simpan data suhu & kelembapan dari ESP32
  static async create(temperature, humidity) {
    const db = await connectDB();
    
    // Tentukan status otomatis berdasarkan kelembapan
    // (Bahan kertas turots ideal di 45-55% RH, di atas 60% rawan jamur)
    let status = 'NORMAL';
    if (humidity > 60.0) {
      status = 'WARNING: HIGH HUMIDITY (JAMUR)';
    } else if (temperature > 30.0) {
      status = 'WARNING: HIGH TEMP';
    }

    const result = await db.run(
      `INSERT INTO sensor_logs (temperature, humidity, status) VALUES (?, ?, ?)`,
      [temperature, humidity, status]
    );
    return { id: result.lastID, temperature, humidity, status };
  }

  // Ambil 20 data sensor terbaru buat grafik di Frontend
  static async getLatest() {
    const db = await connectDB();
    return await db.all(`SELECT * FROM sensor_logs ORDER BY created_at DESC LIMIT 20`);
  }
}

module.exports = SensorData;