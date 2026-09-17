/* =========================================================
   TYPED TEXT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    if (typeof Typed !== "undefined") {

        new Typed(".typed-text", {

            strings: [
                "Full Stack Developer",
                "Frontend Developer",
                "Web Developer",
                "UI Enthusiast"
            ],

            typeSpeed: 70,
            backSpeed: 45,
            backDelay: 1500,

            loop: true,
            showCursor: true,
            cursorChar: "|"

        });

    }


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const header = document.getElementById("header");
    const menuBtn = document.getElementById("menu-btn");
    const navbar = document.getElementById("navbar");

    const backTop = document.getElementById("back-top");

    const navLinks = document.querySelectorAll(".navbar a");
    const sections = document.querySelectorAll("section[id]");

    const revealElements = document.querySelectorAll(".reveal");

    const progressBars = document.querySelectorAll(".progress span");

    const contactForm = document.getElementById("contact-form");
    const formMessage = document.getElementById("form-message");

    const year = document.getElementById("year");


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    if (menuBtn && navbar) {

        menuBtn.addEventListener("click", () => {

            const isOpen = navbar.classList.toggle("open");

            menuBtn.setAttribute(
                "aria-expanded",
                isOpen
            );

            menuBtn.innerHTML = isOpen
                ? '<i class="bx bx-x"></i>'
                : '<i class="bx bx-menu"></i>';

        });


        /* Close menu after clicking link */

        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                navbar.classList.remove("open");

                menuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuBtn.innerHTML =
                    '<i class="bx bx-menu"></i>';

            });

        });

    }


    /* =====================================================
       HEADER ON SCROLL
    ===================================================== */

    function handleHeader() {

        if (!header) return;

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    function handleBackTop() {

        if (!backTop) return;

        if (window.scrollY > 500) {
            backTop.classList.add("show");
        } else {
            backTop.classList.remove("show");
        }

    }


    if (backTop) {

        backTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    function updateActiveSection() {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 150;

            const sectionHeight =
                section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach(link => {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (href === `#${currentSection}`) {
                link.classList.add("active");
            }

        });

    }


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });


    /* =====================================================
       SKILLS PROGRESS ANIMATION
    ===================================================== */

    const skillObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    const bar =
                        entry.target;

                    const width =
                        bar.dataset.width;

                    bar.style.width = width;

                    observer.unobserve(bar);

                });

            },
            {
                threshold: 0.5
            }
        );


    progressBars.forEach(bar => {

        skillObserver.observe(bar);

    });


    /* =====================================================
       CONTACT FORM
    ===================================================== */

    if (contactForm) {

        contactForm.addEventListener("submit", event => {

            event.preventDefault();

            const name =
                document.getElementById("name").value.trim();

            const email =
                document.getElementById("email").value.trim();

            const subject =
                document.getElementById("subject").value.trim();

            const message =
                document.getElementById("message").value.trim();


            if (
                !name ||
                !email ||
                !subject ||
                !message
            ) {

                formMessage.textContent =
                    "Please fill in all fields.";

                return;

            }


            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (!emailPattern.test(email)) {

                formMessage.textContent =
                    "Please enter a valid email address.";

                return;

            }


            /*
                Frontend-only form.

                Later you can connect this form
                with Formspree, EmailJS, Netlify Forms
                or your own backend.
            */

            formMessage.textContent =
                `Thanks ${name}! Your message is ready to be sent.`;

            contactForm.reset();

        });

    }


    /* =====================================================
       WINDOW SCROLL EVENT
    ===================================================== */

    window.addEventListener(
        "scroll",
        () => {

            handleHeader();
            handleBackTop();
            updateActiveSection();

        },
        {
            passive: true
        }
    );


    /* =====================================================
       INITIAL STATE
    ===================================================== */

    handleHeader();
    handleBackTop();
    updateActiveSection();

});