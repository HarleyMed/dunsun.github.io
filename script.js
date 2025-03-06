// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    initSmoothScroll();
    initMobileMenu();
    initDarkMode();
    initFormValidation();
    initBackToTopButton();
    initLazyLoadImages();
});

/* =====================================
   1️⃣ Smooth Scrolling for Navigation
   ===================================== */
function initSmoothScroll() {
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
        });
    });
}

/* =====================================
   2️⃣ Mobile Menu Toggle
   ===================================== */
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }
}

/* =====================================
   3️⃣ Dark Mode Toggle with LocalStorage
   ===================================== */
function initDarkMode() {
    const toggleTheme = document.querySelector('#theme-toggle');

    if (toggleTheme) {
        toggleTheme.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
        });

        // Load saved theme on page load
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-mode');
        }
    }
}

/* =====================================
   4️⃣ Form Validation
   ===================================== */
function initFormValidation() {
    const form = document.querySelector('form');

    if (form) {
        form.addEventListener('submit', function (event) {
            const name = document.querySelector('#name').value;
            const email = document.querySelector('#email').value;

            if (!name || !email.includes('@')) {
                alert('Please enter a valid name and email');
                event.preventDefault();
            }
        });
    }
}

/* =====================================
   5️⃣ Back-to-Top Button
   ===================================== */
function initBackToTopButton() {
    const backToTop = document.querySelector('#back-to-top');

    if (backToTop) {
        window.addEventListener('scroll', () => {
            backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

/* =====================================
   6️⃣ Lazy Loading Images
   ===================================== */
function initLazyLoadImages() {
    const images = document.querySelectorAll("img[data-src]");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.src = entry.target.dataset.src;
                    entry.target.removeAttribute('data-src');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        images.forEach(img => observer.observe(img));
    }
}
