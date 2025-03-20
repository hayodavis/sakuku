from flask import Flask, render_template, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from extensions import db
import requests
import os

app = Flask(__name__)
CORS(app)  # Mengizinkan akses dari frontend

API_BASE_URL = "http://192.168.57.73:5000/api"

def get_sensor_data(endpoint):
    try:
        response = requests.get(f"{API_BASE_URL}/{endpoint}")
        if response.status_code == 200:
            return response.json()
    except requests.exceptions.RequestException:
        return {"kadar": "N/A", "status": "Error"}
    return {"kadar": "N/A", "status": "Error"}

@app.route("/")
def home():
    return render_template("home.html")  # Tidak perlu mengirim data ke template

@app.route("/api/data")
def get_data():
    """ Mengembalikan data sensor dalam format JSON untuk diambil oleh JavaScript """
    data = {
        "suhu": get_sensor_data("suhu"),
        "kelembapan": get_sensor_data("kelembapan"),
        "amonia": get_sensor_data("amonia"),
        "oksigen": get_sensor_data("oksigen"),
        "karbondioksida": get_sensor_data("karbondioksida"),
        "karbonmonoksida": get_sensor_data("karbonmonoksida"),
    }
    return jsonify(data)  # JavaScript akan mengambil data ini setiap 2 detik

@app.route("/api/telur")
def get_telur():
    """Mengambil data produksi telur dari API eksternal"""
    telur_data = get_sensor_data("telur")
    return jsonify(telur_data)

# Konfigurasi database
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
db_path = os.path.join(BASE_DIR, 'database.db')
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{db_path}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'rahasia'

# Inisialisasi SQLAlchemy
db.init_app(app)

# Impor blueprint setelah inisialisasi db
from routes.ayam import ayam_bp
app.register_blueprint(ayam_bp, url_prefix='/ayam')

if __name__ == "__main__":
    # Buat database jika belum ada
    if not os.path.exists(db_path):
        with app.app_context():
            db.create_all()
    app.run(debug=True)
