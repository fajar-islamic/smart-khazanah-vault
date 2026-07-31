# 🏛️ Smart-Khazanah Vault (IoT-based Manuscript Preservation & Access Control)

Sistem Otomatisasi Proteksi Iklim & Kontrol Akses Preservasi Naskah Turots/Kitab Kuning Langka Berbasis IoT & Modern Web Architecture.

## 📌 Pendahuluan & Filosofi
Proyek ini dibangun berdasarkan prinsip **حِفْظُ الْعِلْمِ (Hifzhul 'Ilm)** dan **الأَمَانَةُ (Al-Amanah)**. 
Kitab-kitab kuno/manuskrip ulama tropis sangat rawan hancur akibat jamur (kelembapan >60%) dan pencurian. Sistem ini menggabungkan sensor IoT real-time dengan kontrol akses RFID yang akuntabel.

## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js, SQLite/MongoDB
- **Frontend:** React.js / Next.js + TailwindCSS
- **Hardware/IoT:** ESP32, Sensor DHT11, RFID RC522, Relay Module
- **Protocol:** REST API & HTTP/MQTT

## 📁 Struktur Folder
- `/backend` : REST API Server & Database Access Log
- `/frontend` : Dashboard Pemantau Suhu, Kelembapan, & Remote Door Lock
- `/firmware_esp32` : Kode C++ Arduino untuk Perangkat Mikro