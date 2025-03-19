document.addEventListener("DOMContentLoaded", function() {
    function setupToggle(buttonId) {
        const button = document.getElementById(buttonId);
        button.addEventListener("click", function() {
            if (button.textContent === "ON") {
                button.textContent = "OFF";
                button.classList.add("off");
            } else {
                button.textContent = "ON";
                button.classList.remove("off");
            }
        });
    }

    setupToggle("kipas-btn");
    setupToggle("fogging-btn");
    setupToggle("lampu-btn");
    setupToggle("sprinkler-btn");
});
