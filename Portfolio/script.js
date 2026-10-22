/* =========================================================
   ARAFAT PORTFOLIO
   JAVASCRIPT
========================================================= */


/* =========================================================
   1. MOBILE MENU
========================================================= */

const menuButton = document.getElementById("menuButton");

const navigation = document.getElementById("navigation");


menuButton.addEventListener("click", function () {

    navigation.classList.toggle("open");

});



/* Close menu after clicking */

const navigationLinks =
    document.querySelectorAll(".nav-link");


navigationLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navigation.classList.remove("open");

    });

});



/* =========================================================
   2. ACTIVE NAVIGATION
========================================================= */

const sections =
    document.querySelectorAll("section");


window.addEventListener("scroll", function () {

    let currentSection = "";


    sections.forEach(function (section) {

        const sectionTop =
            section.offsetTop - 180;


        if (window.scrollY >= sectionTop) {

            currentSection = section.id;

        }

    });


    navigationLinks.forEach(function (link) {

        link.classList.remove("active");


        if (
            link.getAttribute("href") ===
            "#" + currentSection
        ) {

            link.classList.add("active");

        }

    });

});



/* =========================================================
   3. SCROLL REVEAL ANIMATION
========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(

        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: 0.12
        }

    );


revealElements.forEach(function (element) {

    revealObserver.observe(element);

});




/* =====================================
   PROJECT FILTERS
===================================== */

const projectFilterButtons = document.querySelectorAll(
    '#projects .project-filter .filter-button'
);

const projectCards = document.querySelectorAll(
    '#projects .project-card'
);

projectFilterButtons.forEach(button => {
    button.addEventListener('click', () => {

        projectFilterButtons.forEach(btn => {
            btn.classList.remove('active');
        });

        button.classList.add('active');

        const filter = button.dataset.filter;

        projectCards.forEach(card => {
            const category = card.dataset.category;

            card.classList.toggle(
                'hide',
                filter !== 'all' && category !== filter
            );
        });
    });
});


/* =====================================
   CERTIFICATE FILTERS
===================================== */

const certificateFilterButtons = document.querySelectorAll(
    '#achievements .certificate-filter .filter-button'
);

const certificateCards = document.querySelectorAll(
    '#achievements .certificate-card'
);

certificateFilterButtons.forEach(button => {
    button.addEventListener('click', () => {

        certificateFilterButtons.forEach(btn => {
            btn.classList.remove('active');
        });

        button.classList.add('active');

        const filter = button.dataset.filter;

        certificateCards.forEach(card => {
            const category = card.dataset.category;

            const shouldShow =
                filter === 'all' || category === filter;

            card.style.display = shouldShow ? '' : 'none';
        });
    });
});


/* =========================================================
   5. CERTIFICATE MODAL
========================================================= */

const certificateButtons =
    document.querySelectorAll(".certificate-button");


const certificateModal =
    document.getElementById("certificateModal");


const modalImage =
    document.getElementById("modalImage");


const modalClose =
    document.getElementById("modalClose");


certificateButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const image =
            button.getAttribute("data-image");


        modalImage.src = image;


        certificateModal.classList.add("show");

    });

});



/* Close modal */

modalClose.addEventListener("click", function () {

    certificateModal.classList.remove("show");

});



/* Close by clicking outside */

certificateModal.addEventListener("click", function (event) {

    if (event.target === certificateModal) {

        certificateModal.classList.remove("show");

    }

});



/* =========================================================
   6. ESCAPE KEY CLOSE MODAL
========================================================= */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        certificateModal.classList.remove("show");

    }

});



/* =========================================================
   7. CONTACT FORM
========================================================= */

const contactForm =
    document.getElementById("contactForm");

const formStatus =
    document.getElementById("formStatus");


contactForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const submitButton =
        contactForm.querySelector('button[type="submit"]');

    const originalText = submitButton.textContent;

    // Clear any previous message
    formStatus.className = "form-status";
    formStatus.textContent = "";

    // Show loading state
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    try {

        const response = await fetch(contactForm.action, {
            method: "POST",
            body: new FormData(contactForm),
            headers: {
                "Accept": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error("Message could not be sent.");
        }

        // Show success message
        formStatus.textContent =
            "✓ Message sent successfully! Thanks for reaching out.";

        formStatus.className = "form-status success";

        contactForm.reset();

    } catch (error) {

        // Show error message
        formStatus.textContent =
            "Sorry, your message couldn't be sent. Please try again.";

        formStatus.className = "form-status error";

    } finally {

        // Restore the button
        submitButton.disabled = false;
        submitButton.textContent = originalText;

    }

});





/* =========================================================
   8. CURRENT YEAR
========================================================= */

document.getElementById("currentYear").textContent =
    new Date().getFullYear();



/* =========================================================
   9. OPTIONAL CURSOR GLOW
========================================================= */

document.addEventListener("mousemove", function (event) {

    const glow =
        document.querySelector(".glow-one");


    if (!glow) return;


    /*
       Keep this subtle.
       You can remove this entire event listener
       if you don't want cursor movement.
    */

    glow.style.transform =
        `translate(${event.clientX * 0.015}px,
                   ${event.clientY * 0.015}px)`;

});