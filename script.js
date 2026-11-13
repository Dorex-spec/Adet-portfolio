// Mobile Navigation & Responsive Drawer Handler
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const closeSidebar = document.getElementById('closeSidebar');
    const sidebar = document.getElementById('sidebar');
    const sidebarBackdrop = document.getElementById('sidebarBackdrop');
    const navLinks = document.querySelectorAll('.nav-link');

    // Function to open drawer
    const openDrawer = () => {
        sidebar.classList.add('open');
        sidebarBackdrop.classList.add('active');
        menuToggle.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };

    // Function to close drawer
    const closeDrawer = () => {
        sidebar.classList.remove('open');
        sidebarBackdrop.classList.remove('active');
        menuToggle.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    };

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            if (sidebar.classList.contains('open')) {
                closeDrawer();
            } else {
                openDrawer();
            }
        });
    }

    if (closeSidebar) {
        closeSidebar.addEventListener('click', closeDrawer);
    }

    if (sidebarBackdrop) {
        sidebarBackdrop.addEventListener('click', closeDrawer);
    }

    // Close mobile drawer when an internal link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                // Update active state
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');

                // Close drawer if on mobile view
                if (window.innerWidth <= 992) {
                    closeDrawer();
                }
            }
        });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar.classList.contains('open')) {
            closeDrawer();
        }
    });

    // Handle window resize cleanly
    window.addEventListener('resize', () => {
        if (window.innerWidth > 992 && sidebar.classList.contains('open')) {
            closeDrawer();
        }
    });

    // IntersectionObserver to update active navigation on scroll
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    const href = link.getAttribute('href');
                    if (href === `#${currentId}`) {
                        link.classList.add('active');
                    } else if (href && href.startsWith('#')) {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    // Hero Photo Error & Alternate SM Logo Switcher
    const heroPhoto = document.querySelector('.hero-photo');
    const heroFallback = document.getElementById('heroFallbackLogo');
    const heroContainer = document.querySelector('.hero-image-container');

    if (heroPhoto && heroFallback) {
        // Automatically switch to SM logo if photo cannot be loaded
        heroPhoto.addEventListener('error', () => {
            heroPhoto.style.display = 'none';
            heroFallback.style.display = 'flex';
        });

        // Allow clicking the emblem container to toggle between Photo and SM Logo
        if (heroContainer) {
            heroContainer.setAttribute('title', 'Click to switch between Photo and SM Logo');
            heroContainer.style.cursor = 'pointer';
            heroContainer.addEventListener('click', () => {
                const isPhotoHidden = window.getComputedStyle(heroPhoto).display === 'none';
                if (isPhotoHidden) {
                    heroPhoto.style.display = 'block';
                    heroFallback.style.display = 'none';
                } else {
                    heroPhoto.style.display = 'none';
                    heroFallback.style.display = 'flex';
                }
            });
        }
    }
});
