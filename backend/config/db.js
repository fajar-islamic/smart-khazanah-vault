const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const path = require('path');

let dbInstance = null;

// Fungsi untuk membuka koneksi ke Database SQLite
async function connectDB() {
  if (dbInstance) return dbInstance;

  // Membuat file database bernama 'khazanah_vault.sqlite' di folder backend
  const dbPath = path.resolve(__dirname, '../khazanah_vault.sqlite');

  dbInstance = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });

  console.log('✅ Database SQLite Berhasil Terhubung!');

  // Bikin Tabel-Tabel Otomatis jika belum ada
  await dbInstance.exec(`
    -- 1. Tabel Data Sensor (Suhu & Kelembapan dari ESP32)
    CREATE TABLE IF NOT EXISTS sensor_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      temperature REAL NOT NULL,
      humidity REAL NOT NULL,
      status TEXT DEFAULT 'NORMAL',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- 2. Tabel Log Akses Pintu (Scan RFID & Remote Lock)
    CREATE TABLE IF NOT EXISTS access_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      uid TEXT NOT NULL,
      user_name TEXT DEFAULT 'UNKNOWN',
      action TEXT NOT NULL,
      status TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- 3. Tabel Riwayat Chat AI (Khazanah-AI Assistant)
    CREATE TABLE IF NOT EXISTS chat_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sender TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  console.log('✅ Tabel Sensor, Access Log, & Chat AI Siap Digunakan!');
  return dbInstance;
}

module.exports = connectDB;