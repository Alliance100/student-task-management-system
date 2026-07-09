const menuToggle = document.getElementById("menuToggle");
const sidebar = document.querySelector(".sidebar");
const overlay = document.querySelector(".sidebar-overlay");
const closeBtn = document.querySelector(".sidebar-close");
menuToggle.addEventListener("click", () => {
    sidebar.classList.add("open");
    overlay.classList.add("show");
});

closeBtn.addEventListener("click", closeSidebar);
overlay.addEventListener("click", closeSidebar);
function closeSidebar() {
    sidebar.classList.remove("open");
    overlay.classList.remove("show");
}

document.querySelectorAll(".sidebar-nav a").forEach(link => {
    link.addEventListener("click", () => {
        if (window.innerWidth <= 1100) {
            closeSidebar();
        }
    });
});