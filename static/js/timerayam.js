function toggleStatus(button) {
    if (button.classList.contains("nonaktif")) {
        button.classList.remove("nonaktif");
        button.classList.add("aktif");
        button.innerText = "AKTIF";
    } else {
        button.classList.remove("aktif");
        button.classList.add("nonaktif");
        button.innerText = "NONAKTIF";
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const button = document.querySelector(".beri-makan-btn");

    button.addEventListener("click", function() {
        alert("🍗 Pakan diberikan ke ayam!");
    });
});

document.addEventListener("DOMContentLoaded", function() {
    function updatePakan(sisa, kapasitas) {
        const persen = (sisa / kapasitas) * 100;
        const progressBar = document.getElementById("progress-bar");
        const sisaPakanText = document.getElementById("sisa-pakan");

        progressBar.style.width = persen + "%";
        progressBar.textContent = Math.round(persen) + "%";
        sisaPakanText.textContent = sisa;

        // Ubah warna berdasarkan kapasitas
        if (persen > 50) {
            progressBar.style.background = "#28a745"; // Hijau
        } else if (persen > 20) {
            progressBar.style.background = "#ffc107"; // Kuning
        } else {
            progressBar.style.background = "#dc3545"; // Merah
        }
    }

    // Contoh pemanggilan fungsi (misalnya sisa pakan 15 kg dari 50 kg total)
    updatePakan(20, 50);
});
