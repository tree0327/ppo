// Portfolio Utilities

// DOM Cache
const DOM_CACHE = new Map();

// Performance Optimizations
const debounceRAF = (func) => {
    let rafId;
    return function(...args) {
        if (rafId) {
            cancelAnimationFrame(rafId);
        }
        rafId = requestAnimationFrame(() => func.apply(this, args));
    };
};

const throttleRAF = (func) => {
    let rafId;
    return function(...args) {
        if (!rafId) {
            rafId = requestAnimationFrame(() => {
                func.apply(this, args);
                rafId = null;
            });
        }
    };
};

// Device Detection
const isMobile = () => window.innerWidth <= 768;
const isTablet = () => window.innerWidth > 768 && window.innerWidth <= 1024;
const isDesktop = () => window.innerWidth > 1024;

const getDeviceType = () => {
    if (isMobile()) return 'mobile';
    if (isTablet()) return 'tablet';
    return 'desktop';
};

// DOM Utilities
const createElement = (tag, className = '', content = '') => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (content) element.textContent = content;
    return element;
};

const updateElement = (selector, updates) => {
    const element = document.querySelector(selector);
    if (!element) return false;
    
    Object.keys(updates).forEach(key => {
        if (key === 'textContent') {
            element.textContent = updates[key];
        } else if (key === 'innerHTML') {
            element.innerHTML = updates[key];
        } else {
            element[key] = updates[key];
        }
    });
    
    return true;
};

const addClass = (element, className) => {
    if (typeof element === 'string') {
        element = document.querySelector(element);
    }
    if (element) element.classList.add(className);
};

const removeClass = (element, className) => {
    if (typeof element === 'string') {
        element = document.querySelector(element);
    }
    if (element) element.classList.remove(className);
};

const toggleClass = (element, className) => {
    if (typeof element === 'string') {
        element = document.querySelector(element);
    }
    if (element) element.classList.toggle(className);
};

// Scroll Utilities
const getScrollPosition = () => ({
    x: window.pageXOffset || document.documentElement.scrollLeft,
    y: window.pageYOffset || document.documentElement.scrollTop
});

const setScrollPosition = (x, y) => {
    window.scrollTo(x, y);
};

// Event Utilities
const addEventListeners = (element, events, handler) => {
    if (typeof element === 'string') {
        element = document.querySelector(element);
    }
    if (!element) return;
    
    events.forEach(event => {
        element.addEventListener(event, handler);
    });
};

const removeEventListeners = (element, events, handler) => {
    if (typeof element === 'string') {
        element = document.querySelector(element);
    }
    if (!element) return;
    
    events.forEach(event => {
        element.removeEventListener(event, handler);
    });
};

const preventDefault = (e) => {
    e.preventDefault();
    e.stopPropagation();
};

// Utility Functions
const getRandomId = (prefix = 'id') => {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

const formatNumber = (num, decimals = 0) => {
    return new Intl.NumberFormat('ko-KR', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    }).format(num);
};

const formatDate = (date, options = {}) => {
    const defaultOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    
    return new Intl.DateTimeFormat('ko-KR', { ...defaultOptions, ...options }).format(date);
};

// Accessibility
const announce = (message, priority = 'polite') => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
};

const initAccessibility = () => {
    // Skip link functionality
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
        skipLink.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(skipLink.getAttribute('href'));
            if (target) {
                target.focus();
                target.scrollIntoView();
            }
        });
    }
    
    // Focus management
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });
};

// Performance Optimizations
const initPerformanceOptimizations = () => {
    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Preload critical resources
    const preloadLinks = document.querySelectorAll('link[rel="preload"]');
    preloadLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href) {
            const preloadLink = document.createElement('link');
            preloadLink.rel = 'preload';
            preloadLink.href = href;
            preloadLink.as = link.getAttribute('as') || 'style';
            document.head.appendChild(preloadLink);
        }
    });
};

// Custom Scrollbar
function initCustomScrollbar() {
    const scrollbarThumb = document.querySelector('.scrollbar-thumb');
    if (!scrollbarThumb) return;
    
    const updateScrollbar = () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        const thumbHeight = Math.max(20, (window.innerHeight / document.documentElement.scrollHeight) * 100);
        
        scrollbarThumb.style.height = `${thumbHeight}%`;
        scrollbarThumb.style.top = `${scrollPercent}%`;
    };
    
    const handleScroll = throttleRAF(() => {
        updateScrollbar();
    });
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', updateScrollbar);
    updateScrollbar();
}

// Initialize utilities
document.addEventListener('DOMContentLoaded', () => {
    initAccessibility();
    initPerformanceOptimizations();
    initCustomScrollbar();
});
