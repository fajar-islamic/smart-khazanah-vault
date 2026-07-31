# 🏛️ Smart-Khazanah Vault (IoT-based Manuscript Preservation & Access Control)

Sistem Otomatisasi Proteksi Iklim & Kontrol Akses Preservasi Naskah Turots/Kitab Kuning Langka Berbasis IoT, AI Assistant, & Modern Web Architecture.

## 📌 Pendahuluan & Filosofi
Proyek ini dibangun berdasarkan prinsip **حِفْظُ الْعِلْمِ (Hifzhul 'Ilm)** dan **الأَمَانَةُ (Al-Amanah)**. 
Kitab-kitab kuno/manuskrip ulama tropis sangat rawan hancur akibat jamur (kelembapan >60%) dan pencurian. Sistem ini menggabungkan sensor IoT real-time, kontrol akses RFID, serta Asisten AI Konsultasi Preservasi Turots.

## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js, SQLite/MongoDB, AI Integration API
- **Frontend:** React.js / Next.js + TailwindCSS
- **Hardware/IoT:** ESP32, Sensor DHT11, RFID RC522, Relay Module
- **Protocol:** REST API & HTTP/MQTT

## 📁 Struktur Folder
- `/backend` : REST API Server, Database Access Log, & AI Engine
- `/frontend` : Dashboard Pemantau Suhu, Kelembapan, Remote Door Lock, & Khazanah-AI Chatbot
- `/firmware_esp32` : Kode C++ Arduino untuk Perangkat Mikro ESP32