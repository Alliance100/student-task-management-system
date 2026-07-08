function initializeFilters() {

    const statusFilter = document.getElementById("statusFilter");
    const priorityFilter = document.getElementById("priorityFilter");
    const clearButton = document.getElementById("clearFilters");

    statusFilter.addEventListener("change", function () {

        currentStatus = this.value;

        applyFilters();

    });

    priorityFilter.addEventListener("change", function () {

        currentPriority = this.value;

        applyFilters();

    });

    clearButton.addEventListener("click", () => {

        currentSearch = "";
        currentStatus = "";
        currentPriority = "";
        currentSort = "newest";

        document.getElementById("searchInput").value = "";
        statusFilter.value = "";
        priorityFilter.value = "";
        document.getElementById("sortFilter").value = "newest";

        applyFilters();

    });

}