const asyncHandler = require('express-async-handler');
const { GoogleGenAI } = require('@google/genai');
const ChatHistory = require('../models/ChatHistory');
const SensorData = require('../models/SensorData');

// Inisialisasi Google Gemini AI SDK
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

// @desc    Konsultasi dengan Khazanah-AI (Pakar Preservasi & Fikih Turots)
// @route   POST /api/ai/chat
const askKhazanahAI = asyncHandler(async (req, res) => {
  const { message } = req.body;

  if (!message) {
    res.status(400);
    throw new Error('Pesan pertanyaan tidak boleh kosong!');
  }

  // 1. Simpan pesan user ke database
  await ChatHistory.saveMessage('user', message);

  // 2. Ambil kondisi sensor suhu & kelembapan paling baru di vault
  const latestSensor = await SensorData.getLatest();
  const currentEnv = latestSensor[0] 
    ? `[Kondisi Ruang Vault Saat Ini - Suhu: ${latestSensor[0].temperature}°C, Kelembapan: ${latestSensor[0].humidity}%]`
    : `[Kondisi Ruang Vault Saat Ini - Suhu: 26°C, Kelembapan: 55%]`;

  // 3. System Prompt Khusus (Menyamarkan AI jadi Pakar Turots & Fikih)
  const systemInstruction = `
    Anda adalah "Khazanah-AI", pakar pakar preservasi naskah kuno/turots serta ahli fikih khazanah pesantren.
    Tugas Anda adalah membantu pengurus perpustakaan dan santri dalam merawat kitab-kitab tua, mencegah jamur/kerusakan fisik, serta memberikan perspektif fikih Islam (kaidah Hifzhul 'Ilm dan Al-Amanah).
    Gunakan bahasa yang sopan, ramah, ilmiah, dan sesekali menggunakan istilah santri/turots yang relevan jika sesuai.
    
    Data Lingkungan Vault Real-time: ${currentEnv}
  `;

  try {
    // 4. Panggil Gemini AI Engine
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        { role: 'user', parts: [{ text: `${systemInstruction}\n\nPertanyaan User: ${message}` }] }
      ]
    });

    const aiReply = response.text || 'Maaf, Khazanah-AI sedang tidak bisa merespon.';

    // 5. Simpan balasan AI ke database
    await ChatHistory.saveMessage('ai', aiReply);

    res.status(200).json({
      success: true,
      reply: aiReply
    });
  } catch (error) {
    console.error('Error Gemini AI:', error);
    // Fallback respon jika API key belum diisi
    const fallbackReply = 'Sistem AI belum terhubung dengan API Key. Namun secara umum: Pastikan kelembapan ruang naskah berada di kisaran 45-55% RH untuk mencegah pertumbuhan jamur Aspergillus pada kertas turots.';
    await ChatHistory.saveMessage('ai', fallbackReply);

    res.status(200).json({
      success: true,
      reply: fallbackReply
    });
  }
});

// @desc    Ambil riwayat percakapan AI
// @route   GET /api/ai/history
const getChatHistory = asyncHandler(async (req, res) => {
  const history = await ChatHistory.getRecentChat();
  res.status(200).json({
    success: true,
    data: history
  });
});

module.exports = { askKhazanahAI, getChatHistory };