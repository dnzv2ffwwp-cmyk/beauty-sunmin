        const menuToggle = document.querySelector(".menu-toggle");
        const mainNav = document.querySelector(".main-nav");

        menuToggle.addEventListener("click", () => {
            const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
            menuToggle.setAttribute("aria-expanded", String(!isExpanded));
            menuToggle.setAttribute("aria-label", isExpanded ? "메뉴 열기" : "메뉴 닫기");
            mainNav.classList.toggle("is-open", !isExpanded);
        });

        mainNav.addEventListener("click", (event) => {
            if (event.target.closest("a")) {
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "메뉴 열기");
                mainNav.classList.remove("is-open");
            }
        });

        document.querySelector("#year").textContent = new Date().getFullYear();

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

        const workCards = document.querySelector("#work-cards");
        if (workCards) {
            const workButtons = document.querySelectorAll("[data-work-scroll]");
            const updateWorkButtons = () => {
                const maxScroll = workCards.scrollWidth - workCards.clientWidth;
                workButtons.forEach((button) => {
                    button.disabled = Number(button.dataset.workScroll) < 0
                        ? workCards.scrollLeft <= 1
                        : workCards.scrollLeft >= maxScroll - 1;
                });
            };
            workButtons.forEach((button) => button.addEventListener("click", () => {
                const card = workCards.querySelector(".project-card");
                const step = card.getBoundingClientRect().width + parseFloat(getComputedStyle(workCards).gap);
                workCards.scrollBy({ left: Number(button.dataset.workScroll) * step,
                    behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
            }));
            workCards.addEventListener("scroll", updateWorkButtons, { passive: true });
            window.addEventListener("resize", updateWorkButtons);
            updateWorkButtons();
        }
