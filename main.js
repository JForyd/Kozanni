document.addEventListener('DOMContentLoaded', () => {
    // 1. Intersection Observer for reveal animations
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: stop observing once revealed
                // observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 2. Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a, .logo-link, .btn[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Update active state in nav
                    if (link.closest('.nav-links')) {
                        document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
                        link.classList.add('active');
                    }
                }
            }
        });
    });

    // 3. Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '15px 60px';
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        } else {
            navbar.style.padding = '0 60px';
            navbar.style.background = 'rgba(0, 0, 0, 0.8)';
        }
    });

    // 4. Parallax effect for hero (subtle)
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (hero) {
            hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
        }
    });
    
    // 5. Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinksList = document.querySelector('.nav-links');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navLinksList.classList.toggle('active');
        });
    }

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu?.classList.remove('active');
            navLinksList?.classList.remove('active');
        });
    });

    // 6. Initial reveal for hero
    setTimeout(() => {
        document.querySelector('.hero-text')?.classList.add('active');
        document.querySelector('.hero-tagline')?.classList.add('active');
        document.querySelector('.hero-actions')?.classList.add('active');
    }, 300);
});
