document.addEventListener("DOMContentLoaded", function () {
    const statsGrid = document.getElementById("statsGrid");
    const ctx = document.getElementById("eggProductionChart").getContext("2d");
    let eggChart = null; // Simpan chart agar bisa dihancurkan nanti

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
        karbonmonoksida: "Karbon Monoksida"
    };

    function fetchData() {
        fetch("/api/data")
            .then(response => response.json())
            .then(data => {
                console.log("Data API:", data);
                let content = ""; // Simpan HTML sementara untuk menghindari flashing UI

                Object.keys(data).forEach(key => {
                    if (!data[key] || data[key].kadar === undefined || data[key].status === undefined) {
                        console.warn(`Data tidak valid untuk ${key}`, data[key]);
                        return; // Skip jika data tidak valid
                    }

                    const { kadar, status } = data[key];

                    console.log(`Key: ${key}, Kadar: ${kadar}, Status: ${status}`);

                    let statusClass = "normal"; // Default warna normal
                    if (status.toUpperCase() === "BAHAYA") {
                        statusClass = "danger"; // Warna merah untuk status "BAHAYA"
                    } else if (status.toUpperCase() === "TINGGI" || (key === "suhu" && kadar > 30)) {
                        statusClass = "high"; // Warna merah jika suhu > 30 derajat
                    } else if (status.toUpperCase() === "RENDAH") {
                        statusClass = "low"; // Warna biru jika status rendah
                    }

                    content += `
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
                });

                statsGrid.innerHTML = content; // Render seluruh elemen sekaligus
            })
            .catch(error => console.error("Gagal mengambil data:", error));
    }

    function fetchEggData() {
        fetch("/api/telur") // Gunakan relative path agar lebih fleksibel
            .then(response => response.json())
            .then(data => {
                if (!data || data.jumlah_telur === undefined) {
                    console.warn("Data telur tidak valid:", data);
                    return;
                }

                const jumlahTelur = data.jumlah_telur;
                const targetProduksi = 500; // Misalnya target produksi 500 butir

                const chartData = {
                    labels: ["Produksi Hari Ini", "Target Produksi"],
                    datasets: [{
                        label: "Jumlah Telur",
                        data: [jumlahTelur, targetProduksi],
                        backgroundColor: ["#76D7C4", "#F5B7B1"], // Warna biru & merah muda
                        borderColor: ["#48C9B0", "#EC7063"],
                        borderWidth: 1
                    }]
                };

                // Hapus chart sebelumnya jika ada
                if (eggChart) {
                    eggChart.destroy();
                }

                // Buat chart baru
                eggChart = new Chart(ctx, {
                    type: "bar",
                    data: chartData,
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                beginAtZero: true,
                                max: 600
                            }
                        }
                    }
                });
            })
            .catch(error => console.error("Gagal mengambil data telur:", error));
    }

    // Jalankan pertama kali
    fetchData();
    fetchEggData();

    // Update setiap 2 detik untuk data sensor, 5 detik untuk grafik telur
    setInterval(fetchData, 2000);
    setInterval(fetchEggData, 5000);
});
