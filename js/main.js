// ===== MAIN APPLICATION ENTRY POINT =====

import { 
    DOM_CACHE, 
    initAOS, 
    initGSAP, 
    initAccessibility, 
    initPerformanceOptimizations,
    createElement,
    updateElement,
    addClass,
    removeClass,
    toggleClass,
    getScrollPosition,
    setScrollPosition,
    isMobile,
    isDesktop,
    getDeviceType,
    addEventListeners,
    removeEventListeners,
    preventDefault,
    debounceRAF,
    throttleRAF
} from './utils.js';

import { 
    initFloatingNavigation, 
    initProjects, 
    initProjectButtonsScroll, 
    initIpadScroll, 
    initContactForm 
} from './components.js';

// ===== LOADING ANIMATION =====
function initLoadingAnimation() {
    const loadingAnimation = document.getElementById('loading-animation');
    const loadingLogo = document.querySelector('.loading-logo');
    const loadingMessages = document.querySelectorAll('.loading-message');
    const loadingBar = document.querySelector('.loading-bar');
    const mainContent = document.querySelector('main');
    const body = document.body;
    
    if (!loadingAnimation || !gsap) {
        if (mainContent) {
            gsap.set(mainContent, { opacity: 1, y: 0 });
        }
        addClass(body, 'loaded');
        return;
    }
    
    // Initial state
    addClass(body, 'loading');
    gsap.set([loadingLogo, ...loadingMessages], { opacity: 0, y: 30 });
    gsap.set(loadingBar, { width: 0 });
    
    // Loading animation timeline
    const loadingTL = gsap.timeline({
        onComplete: () => completeLoading()
    });
    
    // Logo animation
    loadingTL.to(loadingLogo, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
    }, 0.2);
    
    // Message cycle animation
    loadingMessages.forEach((message, index) => {
        const startTime = 0.8 + (index * 0.6);
        
        loadingTL.to(message, {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out"
        }, startTime);
        
        loadingTL.to(message, {
            opacity: 0,
            y: -20,
            duration: 0.3,
            ease: "power2.in"
        }, startTime + 0.4);
    });
    
    // Progress bar animation
    loadingTL.to(loadingBar, {
        width: "100%",
        duration: 2.4,
        ease: "power2.inOut"
    }, 0.8);
    
    // Loading animation fade-out
    loadingTL.to(loadingAnimation, {
        opacity: 0,
        scale: 1.05,
        duration: 1.2,
        ease: "power2.inOut"
    }, 3.2);
    
    // Main content preparation
    if (mainContent) {
        loadingTL.to(mainContent, {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power2.out"
        }, 3.3);
    }
}

function completeLoading() {
    const body = document.body;
    const loadingAnimation = document.getElementById('loading-animation');
    
    removeClass(body, 'loading');
    addClass(body, 'loaded');
    
    gsap.to(loadingAnimation, {
        visibility: "hidden",
        duration: 0.1,
        delay: 1.2
    });
    
    document.documentElement.style.overflow = 'auto';
    document.body.style.overflow = 'auto';
}

// ===== CUSTOM SCROLLBAR =====
function initCustomScrollbar() {
    const customScrollbar = document.getElementById('custom-scrollbar');
    const scrollbarThumb = document.querySelector('.scrollbar-thumb');
    const body = document.body;
    
    if (!customScrollbar || !scrollbarThumb) return;
    
    let isDragging = false;
    let startY = 0;
    let startScrollTop = 0;
    
    const toggleScrollbar = () => {
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;
        
        if (scrollHeight > clientHeight) {
            addClass(customScrollbar, 'visible');
            addClass(body, 'has-custom-scrollbar');
        } else {
            removeClass(customScrollbar, 'visible');
            removeClass(body, 'has-custom-scrollbar');
        }
    };
    
    const updateScrollbarPosition = () => {
        const scrollTop = getScrollPosition();
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;
        
        if (scrollHeight > clientHeight) {
            const scrollPercentage = scrollTop / (scrollHeight - clientHeight);
            const maxTop = window.innerHeight - scrollbarThumb.offsetHeight;
            const newTop = scrollPercentage * maxTop;
            
            gsap.to(scrollbarThumb, {
                top: newTop,
                duration: 0.1,
                ease: "none"
            });
        }
    };
    
    const startDragging = (e) => {
        isDragging = true;
        startY = e.clientY;
        startScrollTop = getScrollPosition();
        
        addClass(customScrollbar, 'dragging');
        document.body.style.userSelect = 'none';
        
        addEventListeners(document, {
            mousemove: handleDragging,
            mouseup: stopDragging
        });
    };
    
    const handleDragging = (e) => {
        if (!isDragging) return;
        
        const deltaY = e.clientY - startY;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;
        const maxScroll = scrollHeight - clientHeight;
        
        const scrollPercentage = deltaY / (window.innerHeight - scrollbarThumb.offsetHeight);
        const newScrollTop = startScrollTop + (scrollPercentage * maxScroll);
        
        setScrollPosition(Math.max(0, Math.min(newScrollTop, maxScroll)));
    };
    
    const stopDragging = () => {
        if (!isDragging) return;
        
        isDragging = false;
        removeClass(customScrollbar, 'dragging');
        document.body.style.userSelect = '';
        
        removeEventListeners(document, {
            mousemove: handleDragging,
            mouseup: stopDragging
        });
    };
    
    // Event listeners
    addEventListeners(scrollbarThumb, {
        mousedown: startDragging
    });
    
    let scrollTimeout;
    const handleScroll = () => {
        updateScrollbarPosition();
        addClass(customScrollbar, 'visible');
        
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            if (!isDragging) {
                removeClass(customScrollbar, 'visible');
            }
        }, 2000);
    };
    
    addEventListeners(window, {
        scroll: handleScroll,
        resize: () => {
            toggleScrollbar();
            updateScrollbarPosition();
        }
    });
    
    // Initialize
    toggleScrollbar();
    updateScrollbarPosition();
    
    setTimeout(() => {
        toggleScrollbar();
        updateScrollbarPosition();
    }, 4000);
}

// ===== STICKY NAVIGATION =====
function initStickyNavigation() {
    const stickyNavToggle = document.querySelector('.sticky-nav-toggle');
    const stickyNavMenu = document.querySelector('.sticky-nav-menu');
    const stickyNavLinks = document.querySelectorAll('.sticky-nav-link');
    
    if (!stickyNavToggle || !stickyNavMenu) return;
    
    const toggleMenu = () => {
        const isExpanded = stickyNavToggle.getAttribute('aria-expanded') === 'true';
        updateElement(stickyNavToggle, {
            'aria-expanded': !isExpanded
        });
        toggleClass(stickyNavToggle, 'active');
        toggleClass(stickyNavMenu, 'active');
    };
    
    const closeMenu = () => {
        updateElement(stickyNavToggle, {
            'aria-expanded': 'false'
        });
        removeClass(stickyNavToggle, 'active');
        removeClass(stickyNavMenu, 'active');
    };
    
    const handleOutsideClick = (event) => {
        if (!stickyNavToggle.contains(event.target) && !stickyNavMenu.contains(event.target)) {
            closeMenu();
        }
    };
    
    // Event listeners
    addEventListeners(stickyNavToggle, {
        click: toggleMenu
    });
    
    stickyNavLinks.forEach(link => {
        addEventListeners(link, {
            click: closeMenu
        });
    });
    
    addEventListeners(document, {
        click: handleOutsideClick
    });
}

// ===== FLOATING NAVIGATION =====
function initFloatingNavigationHandler() {
    const navDots = document.querySelectorAll('.nav-dot');
    const sections = document.querySelectorAll('section[id]');
    
    const updateActiveNav = throttleRAF(() => {
        const scrollPos = getScrollPosition() + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navDots.forEach(dot => {
                    removeClass(dot, 'active');
                    if (dot.getAttribute('href') === `#${sectionId}`) {
                        addClass(dot, 'active');
                    }
                });
                
                const stickyNavLink = document.querySelector(`.sticky-nav-link[href="#${sectionId}"]`);
                if (stickyNavLink) {
                    document.querySelectorAll('.sticky-nav-link').forEach(link => {
                        removeClass(link, 'active');
                    });
                    addClass(stickyNavLink, 'active');
                }
            }
        });
    });
    
    addEventListeners(window, {
        scroll: updateActiveNav
    });
    
    updateActiveNav();
}

// ===== PROJECT TABS =====
function initProjectTabs() {
    const projectButtons = document.querySelectorAll('[data-project]');
    const projectPanels = document.querySelectorAll('.project-info');
    const projectImages = document.querySelector('.project-image');
    
    if (projectButtons.length === 0) return;
    
    const projectImagesList = [
        'img/hycu-1.png',
        'img/urscope-1.png',
        'img/kmr-1.png',
        'img/corfa-1.png',
        'img/landing-1.png',
        'img/smartppt-1.png',
        'img/aidt-1.png',
        'img/iscream-1.png',
        'img/neungryul-1.png'
    ];
    
    const handleProjectClick = (button) => {
        const projectIndex = button.getAttribute('data-project');
        
        // Update buttons
        projectButtons.forEach(btn => removeClass(btn, 'active'));
        addClass(button, 'active');
        
        // Update panels
        projectPanels.forEach(panel => {
            panel.style.display = 'none';
        });
        
        const targetPanel = document.getElementById(`project-panel-${projectIndex}`);
        if (targetPanel) {
            targetPanel.style.display = 'block';
        }
        
        // Update project image
        if (projectImages && projectImagesList[projectIndex]) {
            updateElement(projectImages, {
                src: projectImagesList[projectIndex],
                alt: `프로젝트 ${parseInt(projectIndex) + 1} 미리보기`
            });
        }
    };
    
    projectButtons.forEach(button => {
        addEventListeners(button, {
            click: () => handleProjectClick(button)
        });
    });
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    const handleLinkClick = (e) => {
        preventDefault(e);
        
        const targetId = e.currentTarget.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    };
    
    links.forEach(link => {
        addEventListeners(link, {
            click: handleLinkClick
        });
    });
}

// ===== FORM VALIDATION =====
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    const validationRules = {
        email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        required: (value) => value.trim().length > 0
    };
    
    const validateField = (field) => {
        const value = field.value.trim();
        const fieldName = field.name;
        
        if (field.hasAttribute('required') && !validationRules.required(value)) {
            return false;
        }
        
        if (fieldName === 'email' && value && !validationRules.email(value)) {
            return false;
        }
        
        return true;
    };
    
    const showSubmitStatus = (message, type) => {
        const statusElement = document.getElementById('submit-status');
        if (statusElement) {
            statusElement.textContent = message;
            statusElement.className = `submit-status ${type}`;
            
            setTimeout(() => {
                statusElement.textContent = '';
                statusElement.className = 'submit-status';
            }, 5000);
        }
    };
    
    const handleFormSubmit = (e) => {
        e.preventDefault();
        
        const fields = ['name', 'email', 'subject', 'message'];
        const formData = {};
        
        fields.forEach(fieldName => {
            const field = document.getElementById(fieldName);
            if (field) {
                formData[fieldName] = field.value.trim();
            }
        });
        
        // Validation
        const requiredFields = ['name', 'email', 'subject', 'message'];
        const missingFields = requiredFields.filter(field => !formData[field]);
        
        if (missingFields.length > 0) {
            showSubmitStatus('모든 필드를 입력해주세요.', 'error');
            return;
        }
        
        if (!validationRules.email(formData.email)) {
            showSubmitStatus('올바른 이메일 주소를 입력해주세요.', 'error');
            return;
        }
        
        // Success simulation
        showSubmitStatus('메시지가 성공적으로 전송되었습니다!', 'success');
        contactForm.reset();
    };
    
    addEventListeners(contactForm, {
        submit: handleFormSubmit
    });
}

// ===== SCROLL INDICATOR =====
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.hero-scroll-indicator');
    
    if (!scrollIndicator) return;
    
    const handleScroll = throttleRAF(() => {
        if (getScrollPosition() > 100) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '1';
        }
    });
    
    addEventListeners(window, {
        scroll: handleScroll
    });
}

// ===== MAIN INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize DOM cache first
    DOM_CACHE.init();
    
    // Initialize all functionality with performance optimization
    requestAnimationFrame(() => {
        try {
            // Core functionality
            initFloatingNavigation();
            initProjects();
            initProjectButtonsScroll();
            initIpadScroll();
            initContactForm();
            
            // Utilities
            initAOS();
            initGSAP();
            initAccessibility();
            initPerformanceOptimizations();
            
            // UI components
            initLoadingAnimation();
            initCustomScrollbar();
            initStickyNavigation();
            initFloatingNavigationHandler();
            initProjectTabs();
            initSmoothScrolling();
            initFormValidation();
            initScrollIndicator();
            
            // Performance logging
            if ('performance' in window) {
                const navigation = performance.getEntriesByType('navigation')[0];
                console.log(`📊 DOM Content Loaded: ${Math.round(navigation.domContentLoadedEventEnd)}ms`);
                console.log(`📊 Page Load Complete: ${Math.round(navigation.loadEventEnd)}ms`);
            }
            
        } catch (error) {
            console.error('❌ Initialization error:', error);
            
            // Show user-friendly error message
            const errorDiv = createElement('div', '', {
                style: `
                    position: fixed; 
                    top: 20px; 
                    right: 20px; 
                    background: #f44336; 
                    color: white; 
                    padding: 15px; 
                    border-radius: 5px; 
                    z-index: 9999;
                    font-family: sans-serif;
                `
            });
            
            errorDiv.innerHTML = `
                일부 기능을 로드하는 중 문제가 발생했습니다.
                <button onclick="location.reload()" style="
                    background: white; 
                    color: #f44336; 
                    border: none; 
                    padding: 5px 10px; 
                    margin-left: 10px; 
                    border-radius: 3px; 
                    cursor: pointer;
                ">새로고침</button>
            `;
            
            document.body.appendChild(errorDiv);
            
            setTimeout(() => {
                if (errorDiv.parentNode) {
                    errorDiv.remove();
                }
            }, 10000);
        }
    });
});

// ===== GLOBAL ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});

// ===== DEVELOPMENT HELPERS =====
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.debugApp = {
        DOM_CACHE,
        reinitialize: () => location.reload(),
        performance: () => {
            if ('performance' in window) {
                const navigation = performance.getEntriesByType('navigation')[0];
                const resources = performance.getEntriesByType('resource');
                console.table({
                    'DOM Content Loaded': `${Math.round(navigation.domContentLoadedEventEnd)}ms`,
                    'Page Load Complete': `${Math.round(navigation.loadEventEnd)}ms`,
                    'Resources Loaded': resources.length,
                    'Device Type': getDeviceType(),
                    'Screen Size': `${window.innerWidth}x${window.innerHeight}`
                });
            }
        },
        getDeviceInfo: () => ({
            type: getDeviceType(),
            width: window.innerWidth,
            height: window.innerHeight,
            userAgent: navigator.userAgent
        })
    };
    
    console.log('🛠️ Development mode enabled. Use window.debugApp for debugging.');
}
