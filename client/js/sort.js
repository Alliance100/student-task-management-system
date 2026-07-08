function initializeSorting() {

    const sortFilter = document.getElementById("sortFilter");

    sortFilter.addEventListener("change", function () {

        currentSort = this.value;

        applyFilters();

    });

}