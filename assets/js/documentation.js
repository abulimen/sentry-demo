// Sentry Documentation Page Specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const docsSidebar = document.querySelector('.docs-sidebar');
    const mainContent = document.querySelector('.docs-content'); // To potentially add overlay or adjust content

    if (sidebarToggle && docsSidebar) {
        sidebarToggle.addEventListener('click', function() {
            docsSidebar.classList.toggle('open');
            this.setAttribute('aria-expanded', docsSidebar.classList.contains('open'));
            // Optional: Add a class to body to prevent scrolling when sidebar is open, or an overlay
            document.body.classList.toggle('docs-sidebar-open'); 
        });
    }

    // Close sidebar if user clicks outside of it on mobile (optional enhancement)
    document.addEventListener('click', function(event) {
        if (docsSidebar && docsSidebar.classList.contains('open')) {
            const isClickInsideSidebar = docsSidebar.contains(event.target);
            const isClickOnToggle = sidebarToggle.contains(event.target);

            if (!isClickInsideSidebar && !isClickOnToggle) {
                docsSidebar.classList.remove('open');
                sidebarToggle.setAttribute('aria-expanded', 'false');
                document.body.classList.remove('docs-sidebar-open');
            }
        }
    });

    // Smooth scrolling for documentation in-page navigation links
    const docLinks = document.querySelectorAll('.docs-nav-item a');
    const headerHeight = document.querySelector('.header') ? document.querySelector('.header').offsetHeight : 80; // Fallback to 80px

    docLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) { // Ensure it's an in-page link
                e.preventDefault();
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    // Scroll to target, adjusting for fixed header
                    window.scrollTo({
                        top: targetElement.offsetTop - headerHeight - 10, // Extra 10px buffer
                        behavior: 'smooth'
                    });

                    // Update active class in sidebar
                    docLinks.forEach(l => l.parentElement.classList.remove('active'));
                    this.parentElement.classList.add('active');

                    // Update URL hash without default jump
                    if (history.pushState) {
                        history.pushState(null, null, targetId);
                    } else {
                        window.location.hash = targetId;
                    }

                    // If mobile sidebar is open, close it after navigation
                    if (docsSidebar && docsSidebar.classList.contains('open')) {
                        docsSidebar.classList.remove('open');
                        sidebarToggle.setAttribute('aria-expanded', 'false');
                        document.body.classList.remove('docs-sidebar-open');
                    }
                }
            }
        });
    });

    // Handle initial hash in URL on page load
    if (window.location.hash) {
        const targetElement = document.querySelector(window.location.hash);
        if (targetElement) {
            setTimeout(() => {
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight - 10,
                    behavior: 'auto'
                });
                const activeLink = document.querySelector(`.docs-nav-item a[href="${window.location.hash}"]`);
                if (activeLink) {
                    docLinks.forEach(l => l.parentElement.classList.remove('active'));
                    activeLink.parentElement.classList.add('active');
                }
            }, 100); // Short delay for layout to settle
        }
    }

    // Update active section in sidebar on scroll (simplified version)
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function() {
            const sections = document.querySelectorAll('.docs-section');
            let currentSectionId = '';
            const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

            sections.forEach(section => {
                // Check if section is in viewport (top is above fold, bottom is below fold or it's the last section)
                if (section.offsetTop <= scrollPosition + headerHeight + 20) {
                    currentSectionId = '#' + section.id;
                }
            });
            
            if (currentSectionId) {
                docLinks.forEach(link => {
                    link.parentElement.classList.remove('active');
                    if (link.getAttribute('href') === currentSectionId) {
                        link.parentElement.classList.add('active');
                    }
                });
            }
        }, 100); // Debounce scroll event
    });
});
