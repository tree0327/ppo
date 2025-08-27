// ===== OPTIMIZED JAVASCRIPT WITH PERFORMANCE FOCUS =====

// Cache DOM elements to avoid repeated queries
const DOM_CACHE = {
    body: document.body,
    floatingNav: null,
    projectButtons: null,
    ipadContainer: null,
    contactForm: null
};

// Debounce utility for performance
const debounce = (func, wait) => {
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

// Throttle utility for scroll events
const throttle = (func, limit) => {
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

// Initialize with performance considerations
document.addEventListener('DOMContentLoaded', function() {
    // Cache DOM elements first
    DOM_CACHE.floatingNav = document.querySelector('.floating-nav');
    DOM_CACHE.projectButtons = document.querySelector('.project-buttons-swiper');
    DOM_CACHE.ipadContainer = document.querySelector('.projects-ipad-container');
    DOM_CACHE.contactForm = document.querySelector('#contact-form');
    
    // Initialize functionality with optimized order
    requestAnimationFrame(() => {
        initFloatingNavigation();
        initProjects();
        initProjectButtonsSwiper();
        initIpadScroll();
        initContactForm();
        initAccessibility();
        initPerformanceOptimizations();
    });
    
    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100,
            // Respect user's motion preferences
            disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        });
    }
    
    // Initialize GSAP if available
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        initGSAPAnimations();
    }
});



// ===== FLOATING NAVIGATION =====
function initFloatingNavigation() {
    const navDots = document.querySelectorAll('.nav-dot');
    const sections = document.querySelectorAll('section[id]');
    
    if (!navDots.length || !sections.length) return;
    
    // Intersection Observer for section detection
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -20% 0px',
        threshold: 0
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                updateActiveNavDot(sectionId);
            }
        });
    }, observerOptions);
    
    // Observe all sections
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Navigation dot click handlers
    navDots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = dot.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Smooth scroll to section
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active state
                updateActiveNavDot(targetId);
                
                // Focus management for accessibility
                setTimeout(() => {
                    targetSection.focus();
                }, 1000);
            }
        });
        
        // Keyboard navigation support
        dot.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                dot.click();
            }
        });
    });
    
    function updateActiveNavDot(activeSectionId) {
        navDots.forEach(dot => {
            const href = dot.getAttribute('href');
            if (href === `#${activeSectionId}`) {
                dot.classList.add('active');
                dot.setAttribute('aria-selected', 'true');
            } else {
                dot.classList.remove('active');
                dot.setAttribute('aria-selected', 'false');
            }
        });
    }
}

// ===== PROJECTS FUNCTIONALITY =====
function initProjects() {
    const projectButtons = document.querySelectorAll('.project-buttons .btn');
    const projectImage = document.querySelector('.project-image');
    const projectTitle = document.querySelector('.project-title');
    const projectDesc = document.querySelector('.project-desc');
    const projectTags = document.querySelector('.project-tags');
    
    if (!projectButtons.length) return;
    
    const projectData = [
        {
            title: 'HYCU 졸업전시회 프로젝트',
            desc: '한양사이버대학교 19기 5차 졸업전시회 웹사이트 제작',
            tags: ['HTML5', 'CSS3', 'JavaScript', '반응형 웹'],
            image: 'img/hycu-1.png'
        },
        {
            title: 'URSCOPE 프로젝트',
            desc: 'URSCOPE 기업 웹사이트 리뉴얼 및 개발',
            tags: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap'],
            image: 'img/urscope-1.png'
        },
        {
            title: 'KMR(한국경영인증원) 프로젝트',
            desc: '한국경영인증원 공식 웹사이트 제작',
            tags: ['HTML5', 'CSS3', 'JavaScript', 'jQuery'],
            image: 'img/kmr-1.png'
        },
        {
            title: 'Corfa(연구관리혁신협의회) 프로젝트',
            desc: '연구관리혁신협의회 웹사이트 제작',
            tags: ['HTML5', 'CSS3', 'JavaScript', '반응형 웹'],
            image: 'img/corfa1.jpg'
        },
        {
            title: '랜딩페이지 제작 프로젝트',
            desc: '포트폴리오용 랜딩페이지 제작',
            tags: ['HTML5', 'CSS3', 'JavaScript', 'GSAP'],
            image: 'img/landing1.jpg'
        },
        {
            title: 'SmartPPT2024 프로젝트',
            desc: 'SmartPPT2024 교육 콘텐츠 제작',
            tags: ['HTML5', 'CSS3', 'JavaScript', '교육 콘텐츠'],
            image: 'img/smartppt1.jpg'
        },
        {
            title: 'AIDT 초등수학 프로젝트',
            desc: '초등학생을 위한 수학 교육 콘텐츠 제작',
            tags: ['HTML5', 'CSS3', 'JavaScript', '교육 게임'],
            image: 'img/aidt1.jpg'
        },
        {
            title: 'i-scream 전자저작물 프로젝트',
            desc: 'i-scream 전자저작물 콘텐츠 제작',
            tags: ['HTML5', 'CSS3', 'JavaScript', '멀티미디어'],
            image: 'img/iscream1.jpg'
        },
        {
            title: '능률 중등수학 프로젝트',
            desc: '능률교육 중등수학 교재 콘텐츠 제작',
            tags: ['HTML5', 'CSS3', 'JavaScript', '교육 콘텐츠'],
            image: 'img/mmath1.jpg'
        }
    ];
    
    // Project button click handlers
    projectButtons.forEach((btn, index) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Update ARIA attributes
            projectButtons.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');
            
            // Update project info
            updateProjectInfo(index);
            
            // Update project image
            if (projectImage) {
                projectImage.src = projectData[index].image;
                projectImage.alt = `${projectData[index].title} 미리보기`;
                
                // Add loading state
                projectImage.style.opacity = '0.7';
                projectImage.onload = () => {
                    projectImage.style.opacity = '1';
                };
                
                // Brief scale animation
                if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                    projectImage.style.transform = 'scale(1.1)';
                    setTimeout(() => {
                        projectImage.style.transform = 'scale(1)';
                    }, 300);
                }
            }
        });
        
        // Keyboard navigation support
        btn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                btn.click();
            }
        });
    });
    
    // Update project information
    function updateProjectInfo(index) {
        const currentProject = projectData[index];
        if (currentProject) {
            if (projectTitle) projectTitle.textContent = currentProject.title;
            if (projectDesc) projectDesc.textContent = currentProject.desc;
            
            if (projectTags) {
                projectTags.innerHTML = currentProject.tags.map(tag => 
                    `<span class="tag tag--tech">${tag}</span>`
                ).join('');
            }
        }
    }
    
    // Image scroll functionality
    const imageContainer = document.querySelector('.project-image-container');
    if (imageContainer) {
        let isDragging = false;
        let startY = 0;
        let startScrollY = 0;
        
        // Mouse events
        imageContainer.addEventListener('mousedown', (e) => {
            isDragging = true;
            startY = e.clientY;
            startScrollY = imageContainer.scrollTop;
            imageContainer.style.cursor = 'grabbing';
            imageContainer.setAttribute('aria-grabbed', 'true');
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            
            const deltaY = e.clientY - startY;
            const scrollSpeed = 2;
            imageContainer.scrollTop = startScrollY - (deltaY * scrollSpeed);
        });
        
        document.addEventListener('mouseup', () => {
            isDragging = false;
            imageContainer.style.cursor = 'grab';
            imageContainer.setAttribute('aria-grabbed', 'false');
        });
        
        // Touch events for mobile
        imageContainer.addEventListener('touchstart', (e) => {
            isDragging = true;
            startY = e.touches[0].clientY;
            startScrollY = imageContainer.scrollTop;
        });
        
        imageContainer.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            e.preventDefault(); // Prevent page scroll
            
            const deltaY = e.touches[0].clientY - startY;
            const scrollSpeed = 2;
            imageContainer.scrollTop = startScrollY - (deltaY * scrollSpeed);
        });
        
        imageContainer.addEventListener('touchend', () => {
            isDragging = false;
        });
        
        // Keyboard navigation for image scrolling
        imageContainer.addEventListener('keydown', (e) => {
            const scrollAmount = 50;
            switch(e.key) {
                case 'ArrowUp':
                    e.preventDefault();
                    imageContainer.scrollTop -= scrollAmount;
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    imageContainer.scrollTop += scrollAmount;
                    break;
                case 'Home':
                    e.preventDefault();
                    imageContainer.scrollTop = 0;
                    break;
                case 'End':
                    e.preventDefault();
                    imageContainer.scrollTop = imageContainer.scrollHeight;
                    break;
            }
        });
    }
    
    // Initialize first project
    updateProjectInfo(0);
    
    // Make projectData available globally for iPad functionality
    window.projectData = projectData;
}

// ===== CONTACT FORM =====
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, textarea');
    const submitBtn = form.querySelector('.form-submit');
    const submitStatus = document.getElementById('submit-status');
    
    // Form validation
    inputs.forEach(input => {
        const errorElement = document.getElementById(`${input.id}-error`);
        
        input.addEventListener('blur', () => {
            validateField(input, errorElement);
        });
        
        input.addEventListener('input', () => {
            if (input.classList.contains('error')) {
                validateField(input, errorElement);
            }
        });
    });
    
    // Form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            await submitForm();
        }
    });
    
    function validateField(input, errorElement) {
        const value = input.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        // Required field validation
        if (input.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = '이 필드는 필수입니다.';
        }
        
        // Email validation
        if (input.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = '유효한 이메일 주소를 입력해주세요.';
            }
        }
        
        // Update UI
        if (isValid) {
            input.classList.remove('error');
            if (errorElement) {
                errorElement.classList.remove('show');
                errorElement.textContent = '';
            }
        } else {
            input.classList.add('error');
            if (errorElement) {
                errorElement.classList.add('show');
                errorElement.textContent = errorMessage;
            }
        }
        
        return isValid;
    }
    
    function validateForm() {
        let isValid = true;
        
        inputs.forEach(input => {
            const errorElement = document.getElementById(`${input.id}-error`);
            if (!validateField(input, errorElement)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    async function submitForm() {
        if (submitBtn) submitBtn.disabled = true;
        if (submitStatus) {
            submitStatus.textContent = '메시지를 보내는 중...';
            submitStatus.className = 'submit-status';
        }
        
        try {
            // Simulate form submission (replace with actual API call)
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            if (submitStatus) {
                submitStatus.textContent = '메시지가 성공적으로 전송되었습니다!';
                submitStatus.className = 'submit-status success';
            }
            
            form.reset();
            
        } catch (error) {
            if (submitStatus) {
                submitStatus.textContent = '메시지 전송에 실패했습니다. 다시 시도해주세요.';
                submitStatus.className = 'submit-status error';
            }
        } finally {
            if (submitBtn) submitBtn.disabled = false;
        }
    }
}

// ===== ACCESSIBILITY ENHANCEMENTS =====
function initAccessibility() {
    // Skip to main content functionality
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
        skipLink.addEventListener('click', (e) => {
            e.preventDefault();
            const mainContent = document.getElementById('main-content');
            if (mainContent) {
                mainContent.focus();
                mainContent.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Focus management for modals and overlays
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Close any open modals or overlays
            const openModals = document.querySelectorAll('[aria-modal="true"]');
            openModals.forEach(modal => {
                if (modal.style.display !== 'none') {
                    closeModal(modal);
                }
            });
        }
    });
    
    // Announce dynamic content changes
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                // Announce new content for screen readers
                const newNodes = Array.from(mutation.addedNodes);
                newNodes.forEach(node => {
                    if (node.nodeType === Node.ELEMENT_NODE && node.textContent) {
                        announceToScreenReader(node.textContent);
                    }
                });
            }
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

// ===== PERFORMANCE OPTIMIZATIONS =====
function initPerformanceOptimizations() {
    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Debounced scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
            // Perform scroll-based operations here
        }, 100);
    });
    
    // Throttled resize events
    let resizeTimeout;
    window.addEventListener('resize', () => {
        if (resizeTimeout) {
            clearTimeout(resizeTimeout);
        }
        resizeTimeout = setTimeout(() => {
            // Perform resize-based operations here
        }, 250);
    });
}

// ===== GSAP ANIMATIONS =====
function initGSAPAnimations() {
    if (typeof gsap === 'undefined') return;
    
    // Respect user's motion preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }
    
    // Hero section animations
    gsap.from('.hero-title .title-line', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
    });
    
    gsap.from('.hero-subtitle', {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.4,
        ease: 'power3.out'
    });
    
    gsap.from('.hero-actions', {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.6,
        ease: 'power3.out'
    });
    
    // Parallax effects
    gsap.utils.toArray('.parallax').forEach(element => {
        gsap.to(element, {
            yPercent: -20,
            ease: 'none',
            scrollTrigger: {
                trigger: element,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    });
}

// ===== UTILITY FUNCTIONS =====
function announceToScreenReader(message) {
    // Create a live region for screen reader announcements
    let announcement = document.getElementById('screen-reader-announcement');
    if (!announcement) {
        announcement = document.createElement('div');
        announcement.id = 'screen-reader-announcement';
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.style.position = 'absolute';
        announcement.style.left = '-10000px';
        announcement.style.width = '1px';
        announcement.style.height = '1px';
        announcement.style.overflow = 'hidden';
        document.body.appendChild(announcement);
    }
    
    announcement.textContent = message;
}

function closeModal(modal) {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    
    // Restore focus to the element that opened the modal
    const previousActiveElement = document.activeElement;
    if (previousActiveElement) {
        previousActiveElement.focus();
    }
}

// ===== PROJECT BUTTONS SWIPER =====
function initProjectButtonsSwiper() {
    const projectSwiper = new Swiper('.project-buttons-swiper', {
        slidesPerView: 'auto',
        spaceBetween: 16,
        freeMode: true,
        grabCursor: true,
        mousewheel: {
            forceToAxis: true,
        },
        keyboard: {
            enabled: true,
            onlyInViewport: false,
        },
        scrollbar: {
            el: '.swiper-scrollbar',
            draggable: true,
            dragSize: 50,
            hide: false,
        },
        breakpoints: {
            320: {
                spaceBetween: 12,
            },
            640: {
                spaceBetween: 16,
            },
            1024: {
                spaceBetween: 20,
            }
        }
    });
}

// ===== IPAD SCROLL FUNCTIONALITY =====
function initIpadScroll() {
    // Use cached elements when possible
    const ipadContainer = DOM_CACHE.ipadContainer?.querySelector('.ipad-frame') || 
                          document.querySelector('.projects-ipad-container .ipad-frame');
    const projectImageContainer = document.querySelector('.project-image-container');
    const projectImage = document.querySelector('.project-image');
    
    if (!ipadContainer || !projectImageContainer || !projectImage) return;
    
    let currentProject = 0;
    let scrollPosition = 0; // Y축 스크롤 위치 (0~100%)
    let isScrolling = false;
    
    // Initialize current project image
    function initializeCurrentImage() {
        const projectData = window.projectData || [];
        if (projectData[currentProject]) {
            projectImage.src = projectData[currentProject].image;
            projectImage.alt = `${projectData[currentProject].title} 미리보기`;
            projectImage.style.objectPosition = `center ${scrollPosition}%`;
            updateProjectInfo(currentProject);
            updateProjectButtons(currentProject);
        }
    }
    
    // Update image scroll position with smooth easing
    function updateImagePosition() {
        // Add subtle easing curve
        const easedPosition = scrollPosition;
        projectImage.style.objectPosition = `center ${easedPosition}%`;
        
        // Update iPad progress bar
        updateIpadProgressBar();
        
        // Update scroll indicator opacity based on position
        const container = projectImage.closest('.project-image-container');
        if (container) {
            const indicator = container.querySelector('::after');
            const normalizedPosition = (Math.abs(scrollPosition) / 100);
            // Visual feedback for scroll bounds
            if (scrollPosition >= 95) {
                projectImage.style.filter = 'brightness(1.1) contrast(1.05) saturate(1.1)';
            } else if (scrollPosition <= 5) {
                projectImage.style.filter = 'brightness(1.1) contrast(1.05) saturate(0.9)';
            } else {
                projectImage.style.filter = 'brightness(1.1) contrast(1.05)';
            }
        }
    }
    
    // Update iPad progress bar
    function updateIpadProgressBar() {
        const progressBar = document.querySelector('.ipad-progress-bar');
        if (progressBar) {
            const progressFill = progressBar.querySelector('.progress-fill');
            const progressText = progressBar.querySelector('.progress-text');
            
            if (progressFill && progressText) {
                const percentage = Math.round(scrollPosition);
                progressFill.style.width = `${percentage}%`;
                progressText.textContent = `${percentage}%`;
                
                // Update progress bar appearance based on position
                if (percentage <= 5) {
                    progressFill.style.background = 'linear-gradient(90deg, rgba(212, 185, 150, 0.6), rgba(212, 185, 150, 0.4))';
                    progressText.style.color = 'rgba(255, 255, 255, 0.6)';
                } else if (percentage >= 95) {
                    progressFill.style.background = 'linear-gradient(90deg, rgba(212, 185, 150, 1), rgba(212, 185, 150, 0.8))';
                    progressText.style.color = 'rgba(255, 255, 255, 1)';
                } else {
                    progressFill.style.background = 'linear-gradient(90deg, rgba(212, 185, 150, 0.9), rgba(212, 185, 150, 0.7))';
                    progressText.style.color = 'rgba(255, 255, 255, 0.9)';
                }
            }
        }
    }
    
    // Update project buttons
    function updateProjectButtons(index) {
        const buttons = document.querySelectorAll('.project-buttons-swiper .btn');
        buttons.forEach((btn, i) => {
            btn.classList.toggle('active', i === index);
            btn.setAttribute('aria-selected', i === index);
        });
    }
    
    // Update project info
    function updateProjectInfo(index) {
        const projectData = window.projectData || [];
        const project = projectData[index];
        if (!project) return;
        
        const projectTitle = document.querySelector('.project-title');
        const projectDesc = document.querySelector('.project-desc');
        const projectTags = document.querySelector('.project-tags');
        
        if (projectTitle) projectTitle.textContent = project.title;
        if (projectDesc) projectDesc.textContent = project.desc;
        if (projectTags) {
            projectTags.innerHTML = project.tags.map(tag => 
                `<span class="badge badge-tech">${tag}</span>`
            ).join('');
        }
    }
    
    // Change to different project
    function changeProject(newIndex) {
        const projectData = window.projectData || [];
        if (newIndex >= 0 && newIndex < projectData.length && newIndex !== currentProject) {
            currentProject = newIndex;
            scrollPosition = 0; // Reset scroll position for new project
            
            // Smooth transition to new image
            projectImage.style.transition = 'opacity 0.3s ease, object-position 0.3s ease';
            projectImage.style.opacity = '0';
            
            setTimeout(() => {
                projectImage.src = projectData[currentProject].image;
                projectImage.style.objectPosition = `center ${scrollPosition}%`;
                projectImage.style.opacity = '1';
                updateProjectInfo(currentProject);
                updateProjectButtons(currentProject);
            }, 150);
            
            setTimeout(() => {
                projectImage.style.transition = 'object-position 0.1s ease';
            }, 300);
        }
    }
    
    // Optimized mouse wheel scroll handler
    const handleScroll = throttle((e) => {
        e.preventDefault();
        
        const delta = e.deltaY;
        const scrollStep = Math.min(Math.abs(delta) * 0.1, 3);
        
        if (delta > 0) {
            scrollPosition = Math.min(100, scrollPosition + scrollStep);
        } else {
            scrollPosition = Math.max(0, scrollPosition - scrollStep);
        }
        
        // Use single RAF for smooth updates
        requestAnimationFrame(updateImagePosition);
    }, 16);
    
    // Touch scroll handler for mobile with momentum
    let touchStartY = 0;
    let lastTouchY = 0;
    let isDragging = false;
    let touchVelocity = 0;
    let lastTouchTime = 0;
    let momentumAnimation = null;
    
    function handleTouchStart(e) {
        touchStartY = e.touches[0].clientY;
        lastTouchY = touchStartY;
        lastTouchTime = Date.now();
        isDragging = true;
        touchVelocity = 0;
        
        // Cancel any ongoing momentum
        if (momentumAnimation) {
            cancelAnimationFrame(momentumAnimation);
            momentumAnimation = null;
        }
    }
    
    function handleTouchMove(e) {
        e.preventDefault();
        
        if (!isDragging) return;
        
        const currentTouchY = e.touches[0].clientY;
        const currentTime = Date.now();
        const deltaY = lastTouchY - currentTouchY;
        const deltaTime = currentTime - lastTouchTime;
        
        // Calculate velocity for momentum
        touchVelocity = deltaY / deltaTime;
        
        const scrollStep = deltaY * 0.3; // Reduced sensitivity for smoother control
        
        // Update scroll position with bounds (0% to 100%)
        scrollPosition = Math.max(0, Math.min(100, scrollPosition + scrollStep));
        
        requestAnimationFrame(() => {
            updateImagePosition();
        });
        
        lastTouchY = currentTouchY;
        lastTouchTime = currentTime;
    }
    
    function handleTouchEnd(e) {
        isDragging = false;
        
        // Apply momentum scrolling
        if (Math.abs(touchVelocity) > 0.1) {
            let currentVelocity = touchVelocity * 100; // Scale velocity
            const friction = 0.95; // Friction factor
            
            function applyMomentum() {
                currentVelocity *= friction;
                
                if (Math.abs(currentVelocity) > 0.5) {
                    scrollPosition = Math.max(0, Math.min(100, scrollPosition + currentVelocity));
                    updateImagePosition();
                    momentumAnimation = requestAnimationFrame(applyMomentum);
                } else {
                    momentumAnimation = null;
                }
            }
            
            momentumAnimation = requestAnimationFrame(applyMomentum);
        }
    }
    
    // Keyboard navigation
    function handleKeydown(e) {
        if (!ipadContainer.contains(document.activeElement)) return;
        
        const projectData = window.projectData || [];
        
        switch(e.key) {
            case 'ArrowUp':
                e.preventDefault();
                scrollPosition = Math.max(0, scrollPosition - 10);
                updateImagePosition();
                break;
            case 'ArrowDown':
                e.preventDefault();
                scrollPosition = Math.min(100, scrollPosition + 10);
                updateImagePosition();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                if (currentProject > 0) {
                    changeProject(currentProject - 1);
                }
                break;
            case 'ArrowRight':
                e.preventDefault();
                if (currentProject < projectData.length - 1) {
                    changeProject(currentProject + 1);
                }
                break;
            case 'Home':
                e.preventDefault();
                scrollPosition = 0;
                updateImagePosition();
                break;
            case 'End':
                e.preventDefault();
                scrollPosition = 100;
                updateImagePosition();
                break;
            case 'PageUp':
                e.preventDefault();
                if (currentProject > 0) {
                    changeProject(currentProject - 1);
                }
                break;
            case 'PageDown':
                e.preventDefault();
                if (currentProject < projectData.length - 1) {
                    changeProject(currentProject + 1);
                }
                break;
        }
    }
    
    // Add scroll progress indicator
    function createScrollIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'scroll-indicator';
        indicator.innerHTML = `
            <div class="scroll-track">
                <div class="scroll-thumb"></div>
            </div>
            <div class="scroll-hint">스크롤하여 이미지 탐색</div>
        `;
        projectImageContainer.appendChild(indicator);
        
        // Style the indicator
        Object.assign(indicator.style, {
            position: 'absolute',
            top: '50%',
            right: '12px',
            transform: 'translateY(-50%)',
            zIndex: '10',
            opacity: '0',
            transition: 'opacity 0.3s ease',
            pointerEvents: 'none'
        });
        
        const track = indicator.querySelector('.scroll-track');
        Object.assign(track.style, {
            width: '4px',
            height: '100px',
            background: 'rgba(255, 255, 255, 0.15)',
            borderRadius: '2px',
            position: 'relative',
            border: '1px solid rgba(255, 255, 255, 0.05)'
        });
        
        const thumb = indicator.querySelector('.scroll-thumb');
        Object.assign(thumb.style, {
            width: '100%',
            height: '16px',
            background: 'linear-gradient(180deg, rgba(212, 185, 150, 1), rgba(212, 185, 150, 0.7))',
            borderRadius: '2px',
            position: 'absolute',
            top: '0px',
            left: '0px',
            transition: 'all 0.15s ease',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(212, 185, 150, 0.2)'
        });
        
        const hint = indicator.querySelector('.scroll-hint');
        Object.assign(hint.style, {
            position: 'absolute',
            right: '25px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: '11px',
            whiteSpace: 'nowrap',
            background: 'rgba(0, 0, 0, 0.8)',
            padding: '3px 6px',
            borderRadius: '3px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
        });
        
        return indicator;
    }
    
    // Update scroll indicator position
    function updateScrollIndicator() {
        const indicator = projectImageContainer.querySelector('.scroll-indicator');
        if (indicator) {
            const thumb = indicator.querySelector('.scroll-thumb');
            const track = indicator.querySelector('.scroll-track');
            
            // Calculate precise position
            const trackHeight = 100; // Total track height
            const thumbHeight = 16;  // Thumb height
            const availableSpace = trackHeight - thumbHeight; // Space for movement (84px)
            
            // Convert scroll position (0-100%) to thumb position (0-84px)
            const progress = scrollPosition / 100; // 0 to 1
            const thumbPosition = progress * availableSpace; // 0 to 84px
            
            thumb.style.top = `${thumbPosition}px`;
            thumb.style.transform = 'none';
            
            // Update thumb appearance based on position
            if (scrollPosition <= 2) {
                thumb.style.background = 'linear-gradient(180deg, rgba(212, 185, 150, 0.6), rgba(212, 185, 150, 0.4))';
                thumb.style.borderColor = 'rgba(212, 185, 150, 0.3)';
            } else if (scrollPosition >= 98) {
                thumb.style.background = 'linear-gradient(180deg, rgba(212, 185, 150, 1), rgba(212, 185, 150, 0.8))';
                thumb.style.borderColor = 'rgba(212, 185, 150, 0.5)';
            } else {
                thumb.style.background = 'linear-gradient(180deg, rgba(212, 185, 150, 1), rgba(212, 185, 150, 0.7))';
                thumb.style.borderColor = 'rgba(212, 185, 150, 0.2)';
            }
        }
    }
    
    // Show/hide scroll indicator
    function toggleScrollIndicator(show) {
        const indicator = projectImageContainer.querySelector('.scroll-indicator');
        if (indicator) {
            indicator.style.opacity = show ? '1' : '0';
            
            // Update hint text based on scroll position
            if (show) {
                const hint = indicator.querySelector('.scroll-hint');
                if (hint) {
                    if (scrollPosition <= 5) {
                        hint.textContent = '이미지 시작';
                    } else if (scrollPosition >= 95) {
                        hint.textContent = '이미지 끝';
                    } else {
                        hint.textContent = `${Math.round(scrollPosition)}%`;
                    }
                }
            }
        }
    }
    
    // Initialize
    initializeCurrentImage();
    
    // Create scroll indicator
    const scrollIndicator = createScrollIndicator();
    
    // Add hover effects for indicator
    projectImageContainer.addEventListener('mouseenter', () => toggleScrollIndicator(true));
    projectImageContainer.addEventListener('mouseleave', () => toggleScrollIndicator(false));
    
    // Update indicator when scrolling
    const originalUpdateImagePosition = updateImagePosition;
    updateImagePosition = function() {
        originalUpdateImagePosition();
        updateScrollIndicator();
        
        // Also update hint text when scrolling
        const indicator = projectImageContainer.querySelector('.scroll-indicator');
        if (indicator && indicator.style.opacity === '1') {
            const hint = indicator.querySelector('.scroll-hint');
            if (hint) {
                if (scrollPosition <= 5) {
                    hint.textContent = '이미지 시작';
                } else if (scrollPosition >= 95) {
                    hint.textContent = '이미지 끝';
                } else {
                    hint.textContent = `${Math.round(scrollPosition)}%`;
                }
            }
        }
    };
    
    // Add event listeners
    ipadContainer.addEventListener('wheel', handleScroll, { passive: false });
    ipadContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
    ipadContainer.addEventListener('touchmove', handleTouchMove, { passive: false });
    ipadContainer.addEventListener('touchend', handleTouchEnd, { passive: true });
    ipadContainer.addEventListener('keydown', handleKeydown);
    
    // Make iPad container focusable for keyboard navigation
    ipadContainer.setAttribute('tabindex', '0');
    ipadContainer.setAttribute('role', 'slider');
    ipadContainer.setAttribute('aria-label', '프로젝트 이미지 스크롤');
    ipadContainer.setAttribute('aria-valuemin', '0');
    ipadContainer.setAttribute('aria-valuemax', '100');
    ipadContainer.setAttribute('aria-valuenow', '0');
    
    // Update ARIA values when scrolling
    const originalUpdateImagePositionWithAria = updateImagePosition;
    updateImagePosition = function() {
        originalUpdateImagePositionWithAria();
        ipadContainer.setAttribute('aria-valuenow', Math.round(scrollPosition));
    };
    
    // Sync with project buttons
    const projectButtons = document.querySelectorAll('.project-buttons-swiper .btn');
    projectButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            changeProject(index);
        });
    });
}

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // Log error to analytics service if needed
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    // Log error to analytics service if needed
});

// ===== EXPORT FOR MODULE SYSTEMS =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initCustomCursor,
        initFloatingNavigation,
        initProjects,
        initProjectButtonsSwiper,
        initIpadScroll,
        initContactForm,
        initAccessibility,
        initPerformanceOptimizations
    };
}
