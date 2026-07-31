const connectDB = require('../config/db');

class AccessLog {
  // Catat siapa yang scan RFID / buka pintu dari Web
  static async create(uid, userName, action, status) {
    const db = await connectDB();
    const result = await db.run(
      `INSERT INTO access_logs (uid, user_name, action, status) VALUES (?, ?, ?, ?)`,
      [uid, userName, action, status]
    );
    return { id: result.lastID, uid, userName, action, status };
  }

  // Ambil 15 riwayat pintu terbaru
  static async getHistory() {
    const db = await connectDB();
    return await db.all(`SELECT * FROM access_logs ORDER BY created_at DESC LIMIT 15`);
  }
}

module.exports = AccessLog;