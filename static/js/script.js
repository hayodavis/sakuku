document.addEventListener("DOMContentLoaded", function () {
    const statsGrid = document.getElementById("statsGrid");

    const icons = {
        suhu: "⚗️",
        kelembapan: "💧",
        amonia: "☀️",
        oksigen: "O₂",
        karbondioksida: "CO₂",
        karbonmonoksida: "CO"
    };

    const titles = {
        suhu: "Suhu Rata - Rata",
        kelembapan: "Kelembaban",
        amonia: "Ammonia",
        oksigen: "Oksigen",
        karbondioksida: "Karbon Dioksida",
        karbonmonoksida: "Karbon Monosida"
    };

function fetchData() {
    fetch("/api/data")
        .then(response => response.json())
        .then(data => {
            console.log("Data API:", data); // Cek data yang diterima dari API
            statsGrid.innerHTML = "";

            Object.keys(data).forEach(key => {
                const { kadar, status } = data[key];

                console.log(`Key: ${key}, Status: ${status}`); // Debugging

                const statusClass = status.toUpperCase() === "BAHAYA" ? "danger" :
                                    status === "TINGGI" ? "high" :
                                    status === "RENDAH" ? "low" :
                                    "normal";

                const card = `
                    <div class="card">
                        <div class="card-header">
                            <span class="icon">${icons[key]}</span> ${titles[key]}
                        </div>
                        <div class="card-body">
                            <p class="value">${kadar}</p>
                            <p class="status ${statusClass}">${status}</p>
                        </div>
                    </div>
                `;
                statsGrid.innerHTML += card;
            });
        })
        .catch(error => console.error("Gagal mengambil data:", error));
}
    fetchData(); // Panggil saat pertama kali halaman dimuat
    setInterval(fetchData, 2000); // Update setiap 2 detik
});
