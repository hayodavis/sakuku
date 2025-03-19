from flask import Flask, render_template, jsonify
import requests

app = Flask(__name__)

API_BASE_URL = "http://192.168.56.104:5000/api"

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
    data = {
        "suhu": get_sensor_data("suhu"),
        "kelembapan": get_sensor_data("kelembapan"),
        "amonia": get_sensor_data("amonia"),
        "oksigen": get_sensor_data("oksigen"),
        "karbondioksida": get_sensor_data("karbondioksida"),
        "karbonmonoksida": get_sensor_data("karbonmonoksida"),
    }
    return render_template("home.html", data=data)

if __name__ == "__main__":
    app.run(debug=True)
