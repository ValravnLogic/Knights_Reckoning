/* ============================================
   Knights Reckoning — Landing Page JS
   Language toggle, scroll animations, particles
   ============================================ */

(function () {
    'use strict';

    // ========== LANGUAGE TOGGLE ==========
    let currentLang = 'de';

    function setLanguage(lang) {
        currentLang = lang;
        document.documentElement.lang = lang;

        // Update toggle button
        const toggle = document.getElementById('langToggle');
        if (toggle) {
            toggle.querySelector('.lang-active').textContent = lang.toUpperCase();
            toggle.querySelector('.lang-inactive').textContent = lang === 'de' ? 'EN' : 'DE';
        }

        // Update all translatable elements
        document.querySelectorAll('[data-de][data-en]').forEach(function (el) {
            const text = el.getAttribute('data-' + lang);
            if (text) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = text;
                } else {
                    el.textContent = text;
                }
            }
        });

        // Save preference
        try { localStorage.setItem('kr_lang', lang); } catch (e) {}
    }

    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.addEventListener('click', function () {
            setLanguage(currentLang === 'de' ? 'en' : 'de');
        });
    }

    // Load saved language
    try {
        const saved = localStorage.getItem('kr_lang');
        if (saved === 'en' || saved === 'de') {
            setLanguage(saved);
        }
    } catch (e) {}

    // ========== MOBILE MENU ==========
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', function () {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '64px';
            navLinks.style.left = '0';
            navLinks.style.right = '0';
            navLinks.style.background = 'rgba(10, 14, 23, 0.98)';
            navLinks.style.padding = '16px';
            navLinks.style.borderBottom = '1px solid var(--border)';
        });
    }

    // ========== SCROLL ANIMATIONS ==========
    const fadeEls = document.querySelectorAll('.class-card, .feature-card, .shop-item, .dlc-card, .highlight-item, .steam-box');

    function checkFade() {
        const windowHeight = window.innerHeight;
        fadeEls.forEach(function (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top < windowHeight * 0.88) {
                el.classList.add('visible');
            }
        });
    }

    // Add fade-in class initially
    fadeEls.forEach(function (el) {
        el.classList.add('fade-in');
    });

    window.addEventListener('scroll', checkFade, { passive: true });
    checkFade();

    // ========== HERO PARTICLES ==========
    const particleContainer = document.getElementById('heroParticles');
    if (particleContainer) {
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.cssText =
                'position:absolute;' +
                'width:' + (2 + Math.random() * 3) + 'px;' +
                'height:' + (2 + Math.random() * 3) + 'px;' +
                'background:rgba(212,168,67,' + (0.2 + Math.random() * 0.4) + ');' +
                'border-radius:50%;' +
                'left:' + (Math.random() * 100) + '%;' +
                'top:' + (Math.random() * 100) + '%;' +
                'animation: floatParticle ' + (8 + Math.random() * 12) + 's ease-in-out infinite;' +
                'animation-delay: ' + (-Math.random() * 10) + 's;';
            particleContainer.appendChild(particle);
        }
    }

    // ========== NAVBAR SCROLL EFFECT ==========
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function () {
        const st = window.pageYOffset;
        if (st > 100) {
            navbar.style.background = 'rgba(10, 14, 23, 0.98)';
        } else {
            navbar.style.background = 'rgba(10, 14, 23, 0.92)';
        }
        lastScroll = st;
    }, { passive: true });

    // ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Close mobile menu if open
                if (navLinks && navLinks.style.display === 'flex') {
                    navLinks.style.display = 'none';
                }
            }
        });
    });

    // ========== CSS ANIMATION KEYFRAME (injected) ==========
    const style = document.createElement('style');
    style.textContent =
        '@keyframes floatParticle {' +
        '  0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }' +
        '  25% { transform: translateY(-30px) translateX(10px); opacity: 0.7; }' +
        '  50% { transform: translateY(-15px) translateX(-10px); opacity: 0.5; }' +
        '  75% { transform: translateY(-40px) translateX(5px); opacity: 0.8; }' +
        '}';
    document.head.appendChild(style);

})();
