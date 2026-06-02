document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector("header");
    const nav = document.querySelector("nav");
    const topButton = document.getElementById("topbutton");
    const menuLinks = Array.from(document.querySelectorAll(".main-menu > li > a"));
    const sections = menuLinks
        .map((link) => link.getAttribute("href") || "")
        .filter((href) => href.startsWith("#") && href !== "#")
        .map((href) => document.querySelector(href))
        .filter(Boolean);

    const getNavHeight = () => (nav ? nav.offsetHeight : 0);

    const getSectionTop = (section) => {
        const top = section.getBoundingClientRect().top + window.scrollY;
        return Math.max(top - getNavHeight(), 0);
    };

    const setActiveMenu = (targetId) => {
        menuLinks.forEach((link) => {
            const href = link.getAttribute("href");
            const isCurrent = href === `#${targetId}`;
            link.classList.toggle("fixed", isCurrent);
        });
    };

    const syncMenuState = () => {
        const scrollY = window.scrollY;
        const shouldFollowScroll = scrollY > 100;
        let current = null;

        if (header) {
            header.classList.toggle("is-fixed", shouldFollowScroll);
        }

        for (let index = sections.length - 1; index >= 0; index -= 1) {
            if (scrollY + getNavHeight() + 20 >= sections[index].offsetTop) {
                current = sections[index];
                break;
            }
        }

        setActiveMenu(current ? current.id : "profile");

        if (topButton) {
            topButton.style.display = shouldFollowScroll ? "block" : "none";
        }
    };

    menuLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            const href = link.getAttribute("href");

            const target = href ? document.querySelector(href) : null;

            if (!target) {
                return;
            }

            event.preventDefault();
            window.scrollTo({
                top: getSectionTop(target),
                left: 0,
                behavior: "smooth"
            });
            setActiveMenu(target.id);
        });
    });

    if (topButton) {
        topButton.addEventListener("click", () => {
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        });
    }

    window.addEventListener("scroll", syncMenuState, { passive: true });
    syncMenuState();
});
