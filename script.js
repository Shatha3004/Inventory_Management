document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.getElementById("sidebar");
    const toggleBtn = document.getElementById("toggleBtn");
    const closeBtn = document.getElementById("closeBtn");

    toggleBtn.addEventListener("click", function () {
        sidebar.classList.add("active");
    });

    closeBtn.addEventListener("click", function () {
        sidebar.classList.remove("active");
    });
});


