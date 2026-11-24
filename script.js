
document.addEventListener("DOMContentLoaded", function () {


    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const typingRole = document.getElementById("typing-role");
    const progressBar = document.querySelector(".scroll-progress");
    const topButton = document.querySelector(".back-to-top");

    const navItems = document.querySelectorAll(".nav-links a");
    const sections = document.querySelectorAll("main section[id]");



    if (typingRole) {

        const roles = [
            "Aspiring Web Developer",
            "Frontend Developer",
            "JavaScript Enthusiast",
            "Software Engineering Student"
        ];

        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeEffect() {

            const currentRole = roles[roleIndex];

            if (isDeleting) {
                charIndex--;
            } else {
                charIndex++;
            }

            typingRole.textContent =
                currentRole.substring(0, charIndex);

            let delay = isDeleting ? 45 : 90;

            if (!isDeleting && charIndex === currentRole.length) {

                delay = 1500;
                isDeleting = true;

            } else if (isDeleting && charIndex === 0) {

                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                delay = 400;

            }

            setTimeout(typeEffect, delay);
        }

        typeEffect();
    }



    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", function () {

            navLinks.classList.toggle("open");

            const isOpen = navLinks.classList.contains("open");

            menuToggle.textContent = isOpen ? "✕" : "☰";

            menuToggle.setAttribute("aria-expanded", isOpen);

            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation" : "Open navigation"
            );

        });

        navItems.forEach(function (link) {

            link.addEventListener("click", function () {

                navLinks.classList.remove("open");

                menuToggle.textContent = "☰";

                menuToggle.setAttribute("aria-expanded", "false");

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation"
                );

            });

        });
    }



    const revealElements = document.querySelectorAll(
        ".section-heading, .about-image-container, " +
        ".about-content, .overview-card, .skill-card, .project-card, " +
        ".education-card, .course-card, " +
        ".other-skills, .contact-container"
    );

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach(function (element) {

            element.classList.add("reveal");
            revealObserver.observe(element);

        });

    }



    function updateActiveNavigation() {

        let currentSection = "home";

        sections.forEach(function (section) {

            const sectionTop =
                section.getBoundingClientRect().top + window.scrollY - 160;

            if (window.scrollY >= sectionTop) {

                currentSection = section.id;

            }

        });

        navItems.forEach(function (link) {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + currentSection) {

                link.classList.add("active");

            }

        });
    }



    function updateProgressBar() {

        if (!progressBar) return;

        const totalHeight =
            document.documentElement.scrollHeight - window.innerHeight;

        if (totalHeight <= 0) {

            progressBar.style.width = "0%";
            return;

        }

        const progress =
            (window.scrollY / totalHeight) * 100;

        progressBar.style.width = progress + "%";

    }



    if (topButton) {

        topButton.addEventListener("click", function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }



    let isScrolling = false;

    function handleScroll() {

        if (isScrolling) return;

        isScrolling = true;

        window.requestAnimationFrame(function () {

            updateActiveNavigation();
            updateProgressBar();

            if (topButton) {

                topButton.classList.toggle(
                    "show",
                    window.scrollY > 350
                );

            }

            isScrolling = false;

        });

    }

    window.addEventListener("scroll", handleScroll, {
        passive: true
    });



    const currentYear = document.getElementById("current-year");

    if (currentYear) {

        currentYear.textContent = new Date().getFullYear();

    }



    updateActiveNavigation();
    updateProgressBar();



    console.log("Joolee Singh Portfolio Loaded Successfully!");


const conceptHeading = document.getElementById("concept-heading");

const conceptWords = [
    "Programming Concepts",
    "Web Development",
    "Problem Solving",
    "JavaScript Concepts"
];

let conceptIndex = 0;
let charIndex = 0;
let deleting = false;

function animateConcepts() {
    if (!conceptHeading) return;

    const currentWord = conceptWords[conceptIndex];

    if (!deleting) {
        conceptHeading.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentWord.length) {
            deleting = true;
            setTimeout(animateConcepts, 1200);
            return;
        }
    } else {
        conceptHeading.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            deleting = false;
            conceptIndex = (conceptIndex + 1) % conceptWords.length;
        }
    }

    setTimeout(animateConcepts, deleting ? 50 : 100);
}

animateConcepts();

    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("email");
        const messageInput = document.getElementById("message");
        const submitBtn = document.getElementById("submit-btn");
        const formStatus = document.getElementById("form-status");

        contactForm.addEventListener("submit", async function (e) {
            e.preventDefault();

            const name = nameInput ? nameInput.value.trim() : "";
            const email = emailInput ? emailInput.value.trim() : "";
            const message = messageInput ? messageInput.value.trim() : "";

            if (!name || !email || !message) {
                if (formStatus) {
                    formStatus.textContent = "Please fill in all fields.";
                    formStatus.className = "form-status error";
                }
                return;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                if (formStatus) {
                    formStatus.textContent = "Please enter a valid email address.";
                    formStatus.className = "form-status error";
                }
                return;
            }

            if (formStatus) {
                formStatus.textContent = "";
                formStatus.className = "form-status";
            }

            const originalBtnText = submitBtn ? submitBtn.textContent : "Send Message";
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = "Sending...";
            }

            try {
                const response = await fetch("https://formsubmit.co/ajax/joolee26@navgurukul.org", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        message: message,
                        _subject: "New Message from " + name + " via Portfolio",
                        _captcha: "false"
                    })
                });

                const data = await response.json();

                if (response.ok && (data.success === "true" || data.success === true)) {
                    if (formStatus) {
                        formStatus.textContent = "Thank you! Your message has been sent successfully.";
                        formStatus.className = "form-status success";
                    }
                    contactForm.reset();
                } else if (data.message) {
                    if (formStatus) {
                        formStatus.textContent = data.message;
                        formStatus.className = "form-status " + (data.success === "true" || data.success === true ? "success" : "error");
                    }
                } else {
                    if (formStatus) {
                        formStatus.textContent = "Submission failed. Please try again later.";
                        formStatus.className = "form-status error";
                    }
                }
            } catch (err) {
                if (formStatus) {
                    formStatus.textContent = "Failed to send message. Please check your internet connection.";
                    formStatus.className = "form-status error";
                }
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalBtnText;
                }
            }
        });
    }

});
