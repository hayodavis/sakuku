from flask import Flask, render_template, jsonify
from flask_cors import CORS
import requests

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

if __name__ == "__main__":
    app.run(debug=True)
