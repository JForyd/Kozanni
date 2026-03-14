/* ============================================
   ZAFORIX — Main JavaScript v2
   Premium Interactions & Animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- IntersectionObserver for fade-in animations ----
  const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  });

  animatedElements.forEach(el => observer.observe(el));

  // ---- Active nav link highlighting ----
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // ---- Hamburger menu ----
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-links');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('open');
    });

    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('open');
      });
    });
  }

  // ---- Smooth page transitions ----
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.endsWith('.html') && !href.startsWith('http') && !href.startsWith('#')) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        document.body.classList.add('page-exit');
        setTimeout(() => { window.location.href = href; }, 400);
      });
    }
  });

  // ---- Navbar scroll behavior ----
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  if (navbar) {
    const updateNavbar = () => {
      const scrollY = window.scrollY;
      if (scrollY > 60) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
      lastScroll = scrollY;
    };

    window.addEventListener('scroll', updateNavbar, { passive: true });
    updateNavbar();
  }

  // ---- Parallax effect on hero background ----
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight) {
        heroBg.style.transform = `scale(${1 + scrollY * 0.0001}) translateY(${scrollY * 0.15}px)`;
      }
    }, { passive: true });
  }

  // ---- Contact form handling ----
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('.btn-primary');
      const originalText = btn.textContent;
      btn.textContent = 'MESSAGE SENT';
      btn.style.pointerEvents = 'none';
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.pointerEvents = '';
        contactForm.reset();
      }, 3000);
    });
  }

});
