document.addEventListener("keydown", (event) => {

    // ESC should always work
    if (event.key === "Escape") {

        const deleteModal = document.getElementById("deleteModal");

        if (deleteModal.classList.contains("show")) {

            closeDeleteModal();

        }

        return;

    }

    // Ignore shortcuts while typing
    const tag = document.activeElement.tagName;

    if (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT"
    ) {
        return;
    }

    // Press N
    if (event.key.toLowerCase() === "n") {

        const formSection = document.getElementById("add-task");

        formSection.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

        formSection.classList.remove("section-highlight");

        void formSection.offsetWidth;

        formSection.classList.add("section-highlight");

        setTimeout(() => {

            formSection.classList.remove("section-highlight");

        }, 1200);

        setTimeout(() => {

            document.getElementById("taskTitle").focus();

        }, 350);

    }

});