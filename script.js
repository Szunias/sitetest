document.addEventListener('DOMContentLoaded', () => {

    // --- Smooth Scrolling for Navigation Links ---
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Calculate position considering the fixed header height
                const headerOffset = document.querySelector('header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Project Gallery Fading ---
    const projectItems = document.querySelectorAll('.project-gallery .project-item');
    let currentProjectIndex = 0;
    const fadeInterval = 5000; // 5 seconds

    function showNextProject() {
        if (projectItems.length === 0) return; // Do nothing if no projects

        // Remove active class from current item
        projectItems[currentProjectIndex].classList.remove('active');

        // Increment index, loop back to 0 if necessary
        currentProjectIndex = (currentProjectIndex + 1) % projectItems.length;

        // Add active class to the new current item
        projectItems[currentProjectIndex].classList.add('active');
    }

    // Ensure the first item is active initially (handled by CSS class 'active' in HTML)
    // Start the interval timer
    if (projectItems.length > 1) { // Only start timer if there's more than one item
       setInterval(showNextProject, fadeInterval);
    }

    // --- Simple Scroll Animations ---
    const scrollElements = document.querySelectorAll('.animate-on-scroll');

    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };

    const elementOutOfView = (el) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop > (window.innerHeight || document.documentElement.clientHeight)
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('visible');
    };

    const hideScrollElement = (element) => {
        // Optional: remove class if you want animation to re-trigger on scroll up/down
        // element.classList.remove('visible');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.15)) { // Trigger slightly before element is fully in view
                displayScrollElement(el);
            } else if (elementOutOfView(el)) {
                 // Optional: uncomment to hide element when it goes out of view (top direction)
                // hideScrollElement(el);
            }
        });
    }

    // Initial check on page load
    handleScrollAnimation();
    // Add scroll event listener
    window.addEventListener('scroll', handleScrollAnimation);


    // --- Footer Year ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

}); // End DOMContentLoaded
