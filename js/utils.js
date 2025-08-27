// ===== UTILITIES - ALL HELPER FUNCTIONS =====

// ===== PERFORMANCE UTILITIES =====
export const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

export const throttle = (func, limit) => {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

export const DOM_CACHE = {
    body: document.body,
    floatingNav: null,
    projectButtons: null,
    ipadContainer: null,
    contactForm: null,
    
    init() {
        this.floatingNav = document.querySelector('.floating-nav');
        this.projectButtons = document.querySelector('.project-buttons-swiper');
        this.ipadContainer = document.querySelector('.projects-ipad-container');
        this.contactForm = document.querySelector('#contact-form');
    },
    
    get(selector) {
        const key = selector.replace(/[^a-zA-Z0-9]/g, '');
        if (!this[key]) {
            this[key] = document.querySelector(selector);
        }
        return this[key];
    }
};

// ===== ANIMATION UTILITIES =====
export function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100,
            delay: 100
        });
    }
}

export function initGSAP() {
    if (typeof gsap !== 'undefined') {
        if (typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
        }
        
        const heroTitleLines = document.querySelectorAll('.hero-title .title-line');
        if (heroTitleLines.length > 0) {
            gsap.fromTo(heroTitleLines, 
                {
                    y: 100,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    stagger: 0.2,
                    ease: "power3.out"
                }
            );
        }
        
        const heroSubtitle = document.querySelector('.hero-subtitle');
        if (heroSubtitle) {
            gsap.fromTo(heroSubtitle,
                {
                    y: 50,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    delay: 0.5,
                    ease: "power2.out"
                }
            );
        }
    }
}

export function smoothScrollTo(targetId, offset = 80) {
    const target = document.getElementById(targetId);
    if (target) {
        const targetPosition = target.offsetTop - offset;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// ===== ACCESSIBILITY UTILITIES =====
export function initAccessibility() {
    // Skip link functionality
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
        skipLink.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = skipLink.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            if (target) {
                target.setAttribute('tabindex', '-1');
                target.focus();
                target.addEventListener('blur', () => {
                    target.removeAttribute('tabindex');
                }, { once: true });
            }
        });
    }
    
    // Escape key handling
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const openElements = document.querySelectorAll('[aria-expanded="true"]');
            openElements.forEach(element => {
                element.setAttribute('aria-expanded', 'false');
                element.click();
            });
        }
    });
    
    // Respect motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    function handleMotionPreference(mediaQuery) {
        if (mediaQuery.matches) {
            document.body.classList.add('reduce-motion');
            if (typeof AOS !== 'undefined') {
                AOS.init({ disable: true });
            }
        } else {
            document.body.classList.remove('reduce-motion');
        }
    }
    
    handleMotionPreference(prefersReducedMotion);
    prefersReducedMotion.addEventListener('change', handleMotionPreference);
}

export function announce(message) {
    let liveRegion = document.getElementById('live-region');
    if (!liveRegion) {
        liveRegion = document.createElement('div');
        liveRegion.id = 'live-region';
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.style.cssText = `
            position: absolute !important;
            left: -10000px !important;
            width: 1px !important;
            height: 1px !important;
            overflow: hidden !important;
        `;
        document.body.appendChild(liveRegion);
    }
    
    liveRegion.textContent = '';
    setTimeout(() => {
        liveRegion.textContent = message;
    }, 100);
}

// ===== PERFORMANCE OPTIMIZATIONS =====
export function initPerformanceOptimizations() {
    // Lazy load images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // Optimize scroll performance
    let ticking = false;
    
    function updateScrollElements() {
        const scrollY = window.pageYOffset;
        const nav = document.querySelector('.floating-nav');
        if (nav) {
            nav.classList.toggle('visible', scrollY > window.innerHeight * 0.3);
        }
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollElements);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick, { passive: true });
}
