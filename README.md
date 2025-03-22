<h1> 🐔 Smart Poultry Monitoring System </h1>

Sistem ini adalah aplikasi berbasis web yang digunakan untuk memantau kondisi peternakan ayam secara real-time menggunakan sensor yang terhubung dengan Raspberry Pi Pico W.

<h2> 🚀 Fitur </h2>
Pemantauan suhu, kelembapan, kadar amonia, oksigen, CO₂, dan CO dalam kandang ayam
<ul>
  <li>Penyajian data dalam bentuk kartu statistik</li>
  <li>Manajemen data ayam (sehat/sakit)</li>
  <li>Integrasi dengan sensor IoT melalui Microdot</li>
  <li>API untuk mengambil data sensor secara periodik</li>
</ul>

<h2>🛠️ Teknologi yang Digunakan</h2>
<ul>
  <li>Backend: Flask, Flask-SQLAlchemy, Flask-CORS</li>
  <li>Database: SQLite</li>
  <li>Frontend: HTML, CSS, JavaScript</li>
  <li>IoT: Raspberry Pi Pico W (MicroPython + Microdot)</li>
</ul>

<h2>📂 Struktur Direktori</h2>
<pre>
📦 smart-poultry-monitoring
├── 📁 routes              # Endpoint API dan routing
│   ├── ayam.py           # Manajemen data ayam
│   ├── sensor.py         # API untuk data sensor
├── 📁 templates          # Template HTML untuk frontend
│   ├── home.html         # Tampilan utama
├── 📁 static             # File statis (CSS, JS, gambar)
├── extensions.py         # Inisialisasi database
├── app.py                # Main Flask app
├── requirements.txt      # Dependencies Python
├── database.db           # SQLite Database (auto-generated)
└── README.md             # Dokumentasi proyek
</pre>

<h2>🏁 Instalasi dan Menjalankan Proyek</h2>
1️⃣ Persyaratan
Pastikan Anda memiliki Python 3.x dan pip terinstal di sistem Anda.

2️⃣ Clone Repository
git clone https://github.com/username/smart-poultry-monitoring.git
cd smart-poultry-monitoring

3️⃣ Buat Virtual Environment & Install Dependencies
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows
pip install -r requirements.txt

4️⃣ Konfigurasi Database
python -c 'from app import db; db.create_all()'

5️⃣ Jalankan Aplikasi
python app.py
Akses aplikasi melalui http://127.0.0.1:5000/

<h2>📡 API Endpoint</h2>
<table>
  <tr>
    <th>Endpoint</th>
    <th>Method</th>
    <th>Deskripsi</th>
  </tr>
  <tr>
    <td>/api/data</td>
    <td>GET</td>
    <td>Mengambil data dari sensor</td>
  </tr>
  <tr>
    <td>/api/telur</td>
    <td>GET</td>
    <td>Mengambil data produksi telur</td>
  </tr>
  <tr>
    <td>/ayam</td>
    <td>GET</td>
    <td>Mengelola data ayam</td>
  </tr>
</table>

<h2>🤝 Kontribusi</h2>
<pre>
  Kami sangat terbuka terhadap kontribusi dari siapa saja! Ikuti langkah berikut untuk berkontribusi:
  1. Fork repository ini
  2. Buat branch baru: git checkout -b feature-xyz
  3. Lakukan perubahan dan commit: git commit -m "Menambahkan fitur XYZ"
  4. Push ke branch Anda: git push origin feature-xyz
  5. Buat Pull Request ke branch main
</pre>

<h2>📜 Lisensi</h2>
Proyek ini dirilis di bawah lisensi MIT. Silakan gunakan dan kembangkan sesuai kebutuhan Anda!

<h2>📞 Kontak</h2>
Jika Anda memiliki pertanyaan atau saran, jangan ragu untuk menghubungi:
<ol>
  <li>Email: davis.fandi@gmail.com</li>
</ol>

<b>Happy Coding! 🚀</b>
