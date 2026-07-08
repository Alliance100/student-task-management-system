function initializeSearch() {

    const searchInput = document.getElementById("searchInput");

    searchInput.addEventListener("input", function () {

        currentSearch = this.value.toLowerCase().trim();

        applyFilters();

    });

}