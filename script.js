/**
 * script.js
 * Handles interactivity for the ASH Media Solutions website.
 * - Toggles mobile navigation menu.
 * - Updates footer copyright year automatically.
 * - Provides basic client-side feedback for contact form submission (placeholder).
 * - Implements simple scroll animations using Intersection Observer.
 */

document.addEventListener('DOMContentLoaded', function() {

    // --- Mobile Navigation Toggle ---
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Check if both elements exist
    if (mobileNavToggle && navLinks) {
        mobileNavToggle.addEventListener('click', () => {
            // Toggle the 'active' class on the navigation links container
            navLinks.classList.toggle('active');

            // Optional: Change hamburger icon to 'X' (close icon) when menu is open
            if (navLinks.classList.contains('active')) {
                mobileNavToggle.innerHTML = '✕'; // Use HTML entity for close symbol
                mobileNavToggle.setAttribute('aria-label', 'Close navigation');
            } else {
                mobileNavToggle.innerHTML = '☰'; // Use HTML entity for hamburger symbol
                mobileNavToggle.setAttribute('aria-label', 'Toggle navigation');
            }
        });

        // Close mobile navigation menu when a link inside it is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                // Check if the mobile menu is active before trying to close
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileNavToggle.innerHTML = '☰'; // Reset icon to hamburger
                    mobileNavToggle.setAttribute('aria-label', 'Toggle navigation');
                }
            });
        });
    } else {
        console.warn("Mobile navigation elements not found."); // Warn if elements are missing
    }

    // --- Update Footer Copyright Year ---
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear(); // Set text content to current year
    } else {
        console.warn("Footer year span element not found."); // Warn if element is missing
    }

    // --- Basic Contact Form Handling Placeholder ---
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    // Check if form and status elements exist
    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the default browser form submission

            // --- IMPORTANT ---
            // This section provides client-side feedback ONLY.
            // You MUST configure the 'action' attribute of the <form> tag in HTML
            // to point to a real backend endpoint or a service like Formspree/Netlify Forms
            // for the form data to be actually sent and processed.

            // Display a "sending" message
            formStatus.textContent = 'Sending message...';
            formStatus.className = 'form-status'; // Reset any previous status classes (like success/error)

            // Simulate a network request delay (e.g., 1.5 seconds)
            setTimeout(() => {
                // ---- SIMULATE SUCCESS ----
                // In a real scenario, you would check the response from your server/service here.
                formStatus.textContent = 'Message sent successfully! We\'ll get back to you soon.';
                formStatus.classList.add('success'); // Add success class for styling
                contactForm.reset(); // Clear the form fields

                // ---- SIMULATE ERROR (Example) ----
                // Uncomment the lines below and comment out the success part to test error display.
                // formStatus.textContent = 'Oops! Something went wrong. Please try again later.';
                // formStatus.classList.add('error'); // Add error class for styling

            }, 1500); // 1500 milliseconds = 1.5 seconds
        });
    } else {
        console.warn("Contact form or form status element not found."); // Warn if elements are missing
    }

    // --- Simple Scroll Animations using Intersection Observer ---
    // Select all elements intended for scroll animation
    const animatedElements = document.querySelectorAll('.service-item, .portfolio-item, .about-text, .what-sets-us-apart, .contact-info, .contact-form-container');
    // Note: Hero animations (.animate-fade-in-up) are handled purely by CSS on page load.

    // Configure the Intersection Observer
    const observerOptions = {
        root: null, // Observe intersections relative to the viewport
        rootMargin: '0px', // No margin around the viewport
        threshold: 0.1 // Trigger when at least 10% of the element is visible
    };

    // Callback function executed when an observed element intersects the viewport
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            // If the element is intersecting (visible)
            if (entry.isIntersecting) {
                // Apply styles to make the element visible (fade in, slide up)
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';

                // Optional: Add a 'visible' class if you prefer CSS transitions based on class
                // entry.target.classList.add('visible');

                // Stop observing the element once it has become visible
                observer.unobserve(entry.target);
            }
        });
    };

    // Create the Intersection Observer instance
    const scrollObserver = new IntersectionObserver(observerCallback, observerOptions);

    // Observe each selected element
    animatedElements.forEach(el => {
        // Initially hide the elements that will be animated by this JS observer
        // Set initial styles (invisible and slightly moved down)
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        // Define the transition for the reveal animation
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';

        // Start observing the element
        scrollObserver.observe(el);
    });

}); // End of DOMContentLoaded event listener
