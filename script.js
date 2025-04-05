document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Navigation Toggle ---
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const primaryNav = document.querySelector('nav ul');

    if (mobileNavToggle && primaryNav) {
        mobileNavToggle.addEventListener('click', () => {
            const isExpanded = mobileNavToggle.getAttribute('aria-expanded') === 'true';
            mobileNavToggle.setAttribute('aria-expanded', !isExpanded);
            primaryNav.classList.toggle('active');
            document.body.classList.toggle('mobile-nav-open'); // For potential styling like overflow:hidden
        });

        // Close mobile nav when a link is clicked
        primaryNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (document.body.classList.contains('mobile-nav-open')) {
                    mobileNavToggle.setAttribute('aria-expanded', 'false');
                    primaryNav.classList.remove('active');
                    document.body.classList.remove('mobile-nav-open');
                }
            });
        });
    }


    // --- Smooth Scrolling for Navigation Links ---
    // (Same as before, ensures it works with mobile nav links too)
    const navLinks = document.querySelectorAll('nav a[href^="#"], .footer-nav a[href^="#"], .cta-button[href^="#"], .scroll-down-indicator[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            // Ensure targetId is valid before querying
            if (targetId && targetId !== '#' && targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerOffset = document.querySelector('header')?.offsetHeight || 75; // Use fallback height
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                } else {
                    console.warn(`Target element not found for selector: ${targetId}`);
                }
            }
        });
    });

    // --- Project Gallery Fading ---
    const projectItems = document.querySelectorAll('.project-gallery .project-item');
    let currentProjectIndex = 0;
    const fadeInterval = 5000; // 5 seconds
    let projectIntervalTimer = null; // Variable to hold the interval ID

    function showNextProject() {
        if (projectItems.length === 0) return;

        projectItems[currentProjectIndex].classList.remove('active');
        currentProjectIndex = (currentProjectIndex + 1) % projectItems.length;
        projectItems[currentProjectIndex].classList.add('active');
    }

    function startProjectGallery() {
         // Clear existing timer if any
        if(projectIntervalTimer) {
            clearInterval(projectIntervalTimer);
        }
        // Start the interval timer only if more than one item exists
        if (projectItems.length > 1) {
           projectIntervalTimer = setInterval(showNextProject, fadeInterval);
        }
        // Make sure the first item is active initially (if not already set by HTML)
         if (projectItems.length > 0 && !document.querySelector('.project-gallery .project-item.active')) {
            projectItems[0].classList.add('active');
        }
    }

    // --- Handle Project Link Clicks ---
    // Make the <a> tag itself clickable using its actual href
    // If you added data-project-link, you could use this:
    /*
    projectItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const link = item.dataset.projectLink;
            if (link && link !== '#') {
                // Optional: Pause slideshow on click
                // if (projectIntervalTimer) clearInterval(projectIntervalTimer);
                window.open(link, '_blank'); // Open link in new tab
            } else {
                e.preventDefault(); // Prevent default '#' link behavior if no real link
                console.log("Project link not set for:", item.querySelector('h3')?.textContent);
            }
        });
    });
    */
    // Simplified: Just ensure the href="#" in HTML is updated to the actual link

    startProjectGallery(); // Initial start


    // --- Simple Scroll Animations ---
    // (Using Intersection Observer for better performance)
    const scrollElements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                 // Optional: Stop observing after animation triggers once
                 // observer.unobserve(entry.target);
            }
            // Optional: Remove 'visible' class if element scrolls out of view
            // else {
            //    entry.target.classList.remove('visible');
            // }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
        // rootMargin: '-50px 0px' // Adjust trigger point if needed
    });

    scrollElements.forEach(el => {
        observer.observe(el);
    });


    // --- Footer Year ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- Optional: Header Hide/Show on Scroll ---
    /*
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    const scrollThreshold = 50; // Pixels to scroll before hiding/showing

    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop && scrollTop > header.offsetHeight + scrollThreshold) {
            // Scroll Down
            header.classList.add('header--hidden');
        } else {
            // Scroll Up or near top
            if (scrollTop + window.innerHeight < document.documentElement.scrollHeight || scrollTop < scrollThreshold) {
                 header.classList.remove('header--hidden');
            }
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
    }, false);
    */

}); // End DOMContentLoaded
