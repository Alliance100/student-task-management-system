document.addEventListener("DOMContentLoaded", () => {

    const navLinks = document.querySelectorAll(".sidebar-nav a");

    const sections = document.querySelectorAll(
        "#dashboard,#statistics,#tasks,#add-task"
    );
    let isManualNavigation = false;

    function activateLink(id) {

        document.querySelectorAll(".sidebar-nav li").forEach(li => {

            li.classList.remove("active");

        });

        const activeLink = document.querySelector(
            `.sidebar-nav a[href="#${id}"]`
        );

        if (activeLink) {

            activeLink.parentElement.classList.add("active");

        }

    }

    function glow(element) {

        element.classList.remove("section-highlight");

        void element.offsetWidth;

        element.classList.add("section-highlight");

        setTimeout(() => {

            element.classList.remove("section-highlight");

        }, 1200);

    }

    navLinks.forEach(link => {

        link.addEventListener("click", e => {

            e.preventDefault();

            const id = link.getAttribute("href").substring(1);

            const target = document.getElementById(id);

            if (!target) return;

            isManualNavigation = true;

            activateLink(id);

            let topPosition = target.offsetTop;

            if (id === "dashboard") {

                topPosition = 0;

            }

            if (id === "statistics") {

                topPosition = 0;

            }

            if (id === "tasks") {

                topPosition = target.offsetTop - 20;

            }

            if (id === "add-task") {

                topPosition = target.offsetTop - 20;

            }

            window.scrollTo({

                top: topPosition,

                behavior: "smooth"

            });

            setTimeout(() => {

                isManualNavigation = false;

            }, 900);


            setTimeout(() => {

                if (id === "statistics") {

                    document.querySelectorAll(".stat-card").forEach((card, index) => {

                        setTimeout(() => {

                            glow(card);

                        }, index * 150);

                    });

                }

                else if (id !== "dashboard") {

                    glow(target);

                }

                if (id === "add-task") {

                    setTimeout(() => {

                        const input = document.getElementById("taskTitle");

                        input.focus();

                        input.classList.add("section-highlight");

                        setTimeout(() => {

                            input.classList.remove("section-highlight");

                        }, 1200);

                    }, 200);

                }

            }, 350);

        });

    });

    window.addEventListener("scroll", () => {

        if (isManualNavigation) return;

        let current = "dashboard";

        sections.forEach(section => {

            if (window.scrollY >= section.offsetTop - 120) {

                current = section.id;

            }

        });

        activateLink(current);

    });

});