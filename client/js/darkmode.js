const darkModeToggle = document.getElementById("darkModeToggle");

// Load saved theme
if (localStorage.getItem("theme") === "dark") {

    document.body.classList.add("dark");

    darkModeToggle.checked = true;

}

// Toggle theme
darkModeToggle.addEventListener("change", () => {

    document.body.classList.toggle("dark");

    if (darkModeToggle.checked) {

        localStorage.setItem("theme", "dark");

    }

    else {

        localStorage.setItem("theme", "light");

    }

});

const themeRow = document.querySelector(".theme-toggle");

themeRow.addEventListener("click", (e) => {

    // Ignore clicks on the switch itself
    if (e.target.closest(".switch")) {

        return;

    }

    darkModeToggle.checked = !darkModeToggle.checked;

    darkModeToggle.dispatchEvent(new Event("change"));

});