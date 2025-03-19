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
            console.log("Data API:", data);
            statsGrid.innerHTML = "";

            Object.keys(data).forEach(key => {
                const { kadar, status } = data[key];

                console.log(`Key: ${key}, Kadar: ${kadar}, Status: ${status}`);

                let statusClass = "normal"; // Default
                if (status.toUpperCase() === "BAHAYA") {
                    statusClass = "danger"; // Warna merah untuk status "BAHAYA"
                } else if (status.toUpperCase() === "TINGGI" || (key === "suhu" && kadar > 30)) {
                    // Warna merah jika suhu > 30 derajat atau status tinggi
                    statusClass = "high";
                } else if (status.toUpperCase() === "RENDAH") {
                    statusClass = "low";
                }

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
