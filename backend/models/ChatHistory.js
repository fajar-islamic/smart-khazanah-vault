const connectDB = require('../config/db');

class ChatHistory {
  // Simpan pesan obrolan (dari user/santri maupun respon AI)
  static async saveMessage(sender, message) {
    const db = await connectDB();
    const result = await db.run(
      `INSERT INTO chat_history (sender, message) VALUES (?, ?)`,
      [sender, message]
    );
    return { id: result.lastID, sender, message };
  }

  // Ambil 20 riwayat percakapan AI terakhir
  static async getRecentChat() {
    const db = await connectDB();
    return await db.all(`SELECT * FROM chat_history ORDER BY id ASC LIMIT 20`);
  }
}

module.exports = ChatHistory;