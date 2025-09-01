// ===== UTILITIES - OPTIMIZED HELPER FUNCTIONS =====

// ===== PERFORMANCE UTILITIES =====
export const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
};

export const throttle = (func, limit) => {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

// ===== DOM CACHE =====
export const DOM_CACHE = {
    body: document.body,
    elements: new Map(),
    
    init() {
        this.floatingNav = document.querySelector('.floating-nav');
        this.projectButtons = document.querySelector('.project-buttons-swiper');
        this.ipadContainer = document.querySelector('.projects-ipad-container');
        this.contactForm = document.querySelector('#contact-form');
    },
    
    get(selector) {
        if (!this.elements.has(selector)) {
            this.elements.set(selector, document.querySelector(selector));
        }
        return this.elements.get(selector);
    },
    
    clear() {
        this.elements.clear();
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
    if (typeof gsap === 'undefined') return;
    
    if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }
    
    // Hero animations
    const heroTitleLines = document.querySelectorAll('.hero-title .title-line');
    if (heroTitleLines.length > 0) {
        gsap.fromTo(heroTitleLines, 
            { y: 100, opacity: 0 },
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
            { y: 50, opacity: 0 },
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
    
    const handleMotionPreference = (mediaQuery) => {
        if (mediaQuery.matches) {
            document.body.classList.add('reduce-motion');
            if (typeof AOS !== 'undefined') {
                AOS.init({ disable: true });
            }
        } else {
            document.body.classList.remove('reduce-motion');
        }
    };
    
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
    
    const updateScrollElements = () => {
        const scrollY = window.pageYOffset;
        const nav = document.querySelector('.floating-nav');
        if (nav) {
            nav.classList.toggle('visible', scrollY > window.innerHeight * 0.3);
        }
        ticking = false;
    };
    
    const requestTick = () => {
        if (!ticking) {
            requestAnimationFrame(updateScrollElements);
            ticking = true;
        }
    };
    
    window.addEventListener('scroll', requestTick, { passive: true });
}

// ===== UTILITY FUNCTIONS =====
export const createElement = (tag, className, attributes = {}) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
    return element;
};

export const updateElement = (element, updates = {}) => {
    if (!element) return;
    Object.entries(updates).forEach(([key, value]) => {
        if (key === 'textContent' || key === 'innerHTML') {
            element[key] = value;
        } else if (key === 'style') {
            Object.assign(element.style, value);
        } else {
            element.setAttribute(key, value);
        }
    });
};

export const waitForElement = (selector, timeout = 5000) => {
    return new Promise((resolve, reject) => {
        const element = document.querySelector(selector);
        if (element) {
            resolve(element);
            return;
        }
        
        const observer = new MutationObserver(() => {
            const element = document.querySelector(selector);
            if (element) {
                observer.disconnect();
                resolve(element);
            }
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
        
        setTimeout(() => {
            observer.disconnect();
            reject(new Error(`Element ${selector} not found within ${timeout}ms`));
        }, timeout);
    });
};

export const isElementInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};

export const getScrollPosition = () => {
    return window.pageYOffset || document.documentElement.scrollTop;
};

export const setScrollPosition = (position) => {
    window.scrollTo(0, position);
};

export const addClass = (element, className) => {
    if (element && element.classList) {
        element.classList.add(className);
    }
};

export const removeClass = (element, className) => {
    if (element && element.classList) {
        element.classList.remove(className);
    }
};

export const toggleClass = (element, className) => {
    if (element && element.classList) {
        element.classList.toggle(className);
    }
};

export const hasClass = (element, className) => {
    return element && element.classList && element.classList.contains(className);
};

export const getComputedStyle = (element, property) => {
    return window.getComputedStyle(element).getPropertyValue(property);
};

export const setStyle = (element, property, value) => {
    if (element && element.style) {
        element.style[property] = value;
    }
};

export const getElementRect = (element) => {
    return element ? element.getBoundingClientRect() : null;
};

export const getElementOffset = (element) => {
    if (!element) return { top: 0, left: 0 };
    
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    
    return {
        top: rect.top + scrollTop,
        left: rect.left + scrollLeft
    };
};

export const getElementSize = (element) => {
    if (!element) return { width: 0, height: 0 };
    
    const rect = element.getBoundingClientRect();
    return {
        width: rect.width,
        height: rect.height
    };
};

export const isMobile = () => {
    return window.innerWidth <= 768;
};

export const isTablet = () => {
    return window.innerWidth > 768 && window.innerWidth <= 1024;
};

export const isDesktop = () => {
    return window.innerWidth > 1024;
};

export const getDeviceType = () => {
    if (isMobile()) return 'mobile';
    if (isTablet()) return 'tablet';
    return 'desktop';
};

export const addEventListeners = (element, events) => {
    if (!element) return;
    
    Object.entries(events).forEach(([event, handler]) => {
        element.addEventListener(event, handler);
    });
};

export const removeEventListeners = (element, events) => {
    if (!element) return;
    
    Object.entries(events).forEach(([event, handler]) => {
        element.removeEventListener(event, handler);
    });
};

export const preventDefault = (e) => {
    e.preventDefault();
    e.stopPropagation();
};

export const getRandomId = (prefix = 'id') => {
    return `${prefix}_${Math.random().toString(36).substr(2, 9)}`;
};

export const formatNumber = (num, decimals = 0) => {
    return new Intl.NumberFormat('ko-KR', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    }).format(num);
};

export const formatDate = (date, options = {}) => {
    const defaultOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    
    return new Intl.DateTimeFormat('ko-KR', { ...defaultOptions, ...options }).format(date);
};

export const debounceRAF = (func) => {
    let rafId;
    return function(...args) {
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => func.apply(this, args));
    };
};

export const throttleRAF = (func) => {
    let rafId;
    return function(...args) {
        if (rafId) return;
        
        rafId = requestAnimationFrame(() => {
            func.apply(this, args);
            rafId = null;
        });
    };
};
