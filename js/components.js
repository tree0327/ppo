// ===== COMPONENTS - OPTIMIZED UI FUNCTIONALITY =====

import { DOM_CACHE, throttle, debounce, smoothScrollTo, announce } from './utils.js';

// ===== PROJECT DATA =====
export const projectData = [
    {
        id: 0,
        title: 'HYCU 졸업전시회 프로젝트',
        description: '한양사이버대학교 19기 5차 졸업전시회 웹사이트 제작',
        tags: ['HTML5', 'CSS3', 'JavaScript', '반응형 웹'],
        image: 'img/hycu-1.png'
    },
    {
        id: 1,
        title: 'URSCOPE 프로젝트',
        description: 'URSCOPE 기업 웹사이트 리뉴얼 및 개발',
        tags: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap'],
        image: 'img/urscope-1.png'
    },
    {
        id: 2,
        
        title: 'KMR(한국경영인증원) 프로젝트',
        description: '한국경영인증원 공식 웹사이트 제작',
        tags: ['HTML5', 'CSS3', 'JavaScript', 'jQuery'],
        image: 'img/kmr-1.png'
    },
    {
        id: 3,
        title: 'Corfa(연구관리혁신협의회) 프로젝트',
        description: '연구관리혁신협의회 웹사이트 제작',
        tags: ['HTML5', 'CSS3', 'JavaScript', '반응형 웹'],
        image: 'img/corfa1.jpg'
    },
    {
        id: 4,
        title: '랜딩페이지 제작 프로젝트',
        description: '포트폴리오용 랜딩페이지 제작',
        tags: ['HTML5', 'CSS3', 'JavaScript', 'GSAP'],
        image: 'img/landing1.jpg'
    },
    {
        id: 5,
        title: 'SmartPPT2024 프로젝트',
        description: 'SmartPPT2024 교육 콘텐츠 제작',
        tags: ['HTML5', 'CSS3', 'JavaScript', '교육 콘텐츠'],
        image: 'img/smartppt1.jpg'
    },
    {
        id: 6,
        title: 'AIDT 초등수학 프로젝트',
        description: '초등학생을 위한 수학 교육 콘텐츠 제작',
        tags: ['HTML5', 'CSS3', 'JavaScript', '교육 게임'],
        image: 'img/aidt1.jpg'
    },
    {
        id: 7,
        title: 'i-scream 전자저작물 프로젝트',
        description: 'i-scream 전자저작물 콘텐츠 제작',
        tags: ['HTML5', 'CSS3', 'JavaScript', '멀티미디어'],
        image: 'img/iscream1.jpg'
    },
    {
        id: 8,
        title: '능률 중등수학 프로젝트',
        description: '능률교육 중등수학 교재 콘텐츠 제작',
        tags: ['HTML5', 'CSS3', 'JavaScript', '교육 콘텐츠'],
        image: 'img/mmath1.jpg'
    }
];

// ===== UTILITY FUNCTIONS =====
const createElement = (tag, className, attributes = {}) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
    return element;
};

const updateElement = (element, updates = {}) => {
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

// ===== FLOATING NAVIGATION =====
export function initFloatingNavigation() {
    const floatingNav = DOM_CACHE.get('.floating-nav');
    if (!floatingNav) return;
    
    const navDots = floatingNav.querySelectorAll('.nav-dot');
    const sections = document.querySelectorAll('section[id]');
    
    if (navDots.length === 0 || sections.length === 0) return;
    
    // Navigation click handler
    const handleNavClick = (e) => {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href').substring(1);
        smoothScrollTo(targetId);
        
        navDots.forEach(dot => dot.classList.remove('active'));
        e.currentTarget.classList.add('active');
    };
    
    // Scroll detection handler
    const handleScroll = throttle(() => {
        const scrollPosition = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        let activeSection = null;
        let minDistance = Infinity;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionMiddle = sectionTop + (sectionHeight / 2);
            const viewportMiddle = scrollPosition + (windowHeight / 2);
            
            const distance = Math.abs(sectionMiddle - viewportMiddle);
            if (distance < minDistance) {
                minDistance = distance;
                activeSection = section;
            }
        });
        
        if (activeSection) {
            const activeSectionId = activeSection.getAttribute('id');
            const correspondingDot = Array.from(navDots).find(dot => 
                dot.getAttribute('href') === `#${activeSectionId}`
            );
            
            if (correspondingDot) {
                navDots.forEach(dot => dot.classList.remove('active'));
                correspondingDot.classList.add('active');
            }
        }
    }, 100);
    
    // Event listeners
    navDots.forEach(dot => dot.addEventListener('click', handleNavClick));
    window.addEventListener('scroll', handleScroll);
    handleScroll();
}

// ===== PROJECTS =====
export function initProjects() {
    const projectButtons = document.querySelectorAll('.project-tabs-container .btn');
    const projectInfos = document.querySelectorAll('.project-info');
    
    if (projectButtons.length === 0) return;
    
    const updateProjectDisplay = (index) => {
        const project = projectData[index];
        if (!project) return;
        
        const elements = {
            image: document.querySelector('.project-image'),
            title: document.querySelector('.project-title'),
            desc: document.querySelector('.project-desc'),
            tags: document.querySelector('.project-tags')
        };
        
        // Update elements
        if (elements.image) {
            updateElement(elements.image, {
                src: project.image,
                alt: `${project.title} 미리보기`
            });
        }
        
        if (elements.title) {
            elements.title.textContent = project.title;
        }
        
        if (elements.desc) {
            elements.desc.textContent = project.description;
        }
        
        if (elements.tags) {
            elements.tags.innerHTML = project.tags.map(tag => 
                `<span class="badge badge-tech">${tag}</span>`
            ).join('');
        }
    };
    
    const handleProjectClick = (index) => {
        // Update button states
        projectButtons.forEach((btn, i) => {
            btn.classList.toggle('active', i === index);
            btn.setAttribute('aria-selected', i === index);
        });
        
        // Update project info visibility
        projectInfos.forEach((info, i) => {
            const isVisible = i === index;
            info.style.display = isVisible ? 'block' : 'none';
            info.setAttribute('aria-hidden', !isVisible);
        });
        
        // Update project display
        updateProjectDisplay(index);
        
        // Update progress bar
        animateTabProgress(index, projectButtons.length);
    };
    
    // Event listeners
    projectButtons.forEach((button, index) => {
        button.addEventListener('click', () => handleProjectClick(index));
    });
    
    // Initialize first project
    if (projectButtons.length > 0) {
        handleProjectClick(0);
    }
}

// ===== TAB PROGRESS BAR =====
function animateTabProgress(activeIndex, totalTabs) {
    const progressFill = document.querySelector('.tab-progress-fill');
    if (!progressFill) return;
    
    const progress = ((activeIndex + 1) / totalTabs) * 100;
    
    gsap.to(progressFill, {
        transform: `translateX(${progress - 100}%)`,
        background: `linear-gradient(90deg, 
            rgba(5, 150, 105, 0.9), 
            rgba(16, 185, 129, 0.9)
        )`,
        duration: 0.8,
        ease: "power3.out",
        overwrite: "auto"
    });
}

// ===== PROJECT BUTTONS HORIZONTAL SCROLL =====
export function initProjectButtonsScroll() {
    const scrollContainer = document.querySelector('.project-tabs-container');
    const progressBar = document.querySelector('.tab-progress-bar');
    const progressFill = document.querySelector('.tab-progress-fill');
    
    if (!scrollContainer) return;

    const updateProgressBar = () => {
        if (!progressBar || !progressFill) return;
        
        const scrollLeft = scrollContainer.scrollLeft;
        const scrollWidth = scrollContainer.scrollWidth - scrollContainer.clientWidth;
        const progress = scrollWidth > 0 ? (scrollLeft / scrollWidth) * 100 : 0;
        
        gsap.to(progressFill, {
            width: `${Math.max(0, Math.min(100, progress))}%`,
            duration: 0.4,
            ease: "power2.out",
            overwrite: "auto"
        });
    };

    // Scroll event with throttling
    let scrollTimeout;
    scrollContainer.addEventListener('scroll', () => {
        if (scrollTimeout) return;
        scrollTimeout = setTimeout(() => {
            updateProgressBar();
            scrollTimeout = null;
        }, 16);
    });

    // Mouse wheel horizontal scroll
    scrollContainer.addEventListener('wheel', (e) => {
        e.preventDefault();
        scrollContainer.scrollLeft += e.deltaY * 2;
    });

    // Drag scroll implementation
    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;

    const handleDragStart = (e) => {
        if (e.target.closest('.btn')) return;
        
        isDragging = true;
        startX = e.pageX;
        scrollLeft = scrollContainer.scrollLeft;
        scrollContainer.style.cursor = 'grabbing';
        scrollContainer.style.userSelect = 'none';
        e.preventDefault();
    };

    const handleDragMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        
        const x = e.pageX;
        const walk = (startX - x) * 1.5;
        scrollContainer.scrollLeft = scrollLeft + walk;
    };

    const handleDragEnd = () => {
        if (isDragging) {
            isDragging = false;
            scrollContainer.style.cursor = 'default';
            scrollContainer.style.userSelect = 'auto';
        }
    };

    // Touch events for mobile
    let touchStartX = 0;
    let touchScrollLeft = 0;

    scrollContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchScrollLeft = scrollContainer.scrollLeft;
    }, { passive: true });

    scrollContainer.addEventListener('touchmove', (e) => {
        const touchX = e.touches[0].clientX;
        const walk = (touchStartX - touchX) * 1.5;
        scrollContainer.scrollLeft = touchScrollLeft + walk;
    }, { passive: true });

    // Progress bar click navigation
    if (progressBar) {
        progressBar.addEventListener('click', (e) => {
            const rect = progressBar.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const percentage = Math.max(0, Math.min(1, clickX / rect.width));
            const scrollWidth = scrollContainer.scrollWidth - scrollContainer.clientWidth;
            
            if (scrollWidth > 0) {
                scrollContainer.scrollTo({
                    left: scrollWidth * percentage,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Event listeners
    scrollContainer.addEventListener('mousedown', handleDragStart);
    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('mouseup', handleDragEnd);
    scrollContainer.addEventListener('mouseleave', handleDragEnd);

    // Initialize
    updateProgressBar();
    window.addEventListener('resize', updateProgressBar);
}

// ===== IPAD SCROLL =====
export function initIpadScroll() {
    const ipadContainer = DOM_CACHE.ipadContainer?.querySelector('.ipad-frame') || 
                          document.querySelector('.projects-ipad-container .ipad-frame');
    const projectImage = document.querySelector('.project-image');
    
    if (!ipadContainer || !projectImage) return;
    
    let scrollPosition = 0;
    let isDragging = false;
    let lastTouchY = 0;
    
    const updateImagePosition = () => {
        const objectPosition = `center ${scrollPosition}%`;
        projectImage.style.objectPosition = objectPosition;
        
        // Visual feedback
        let filter = 'brightness(1.1) contrast(1.05)';
        if (scrollPosition <= 5 || scrollPosition >= 95) {
            filter += ' saturate(0.9)';
        }
        projectImage.style.filter = filter;
        
        // Update progress bar
        const progressFill = document.querySelector('.progress-fill');
        const progressText = document.querySelector('.progress-text');
        
        if (progressFill) {
            const targetGradient = scrollPosition <= 10 || scrollPosition >= 90 
                ? 'linear-gradient(90deg, #ff6b6b, #feca57)'
                : 'linear-gradient(90deg, #059669, #10B981, #34D399)';
            
            gsap.to(progressFill, {
                width: `${scrollPosition}%`,
                background: targetGradient,
                duration: 0.5,
                ease: "power3.out",
                overwrite: "auto"
            });
        }
        
        if (progressText) {
            const targetColor = scrollPosition <= 10 || scrollPosition >= 90 
                ? '#ff6b6b' 
                : '#ffffff';
            
            gsap.to(progressText, {
                textContent: `${Math.round(scrollPosition)}%`,
                color: targetColor,
                duration: 0.4,
                ease: "power2.out",
                snap: { textContent: 1 },
                overwrite: "auto"
            });
        }
        
        ipadContainer.setAttribute('aria-valuenow', Math.round(scrollPosition));
    };
    
    const handleScroll = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const delta = e.deltaY;
        const scrollStep = Math.abs(delta) * 0.15;
        
        if (delta > 0) {
            scrollPosition = Math.min(100, scrollPosition + scrollStep);
        } else {
            scrollPosition = Math.max(0, scrollPosition - scrollStep);
        }
        
        updateImagePosition();
        return false;
    };
    
    const handleTouchStart = (e) => {
        e.preventDefault();
        lastTouchY = e.touches[0].clientY;
        isDragging = true;
    };
    
    const handleTouchMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        
        const currentY = e.touches[0].clientY;
        const deltaY = lastTouchY - currentY;
        const scrollStep = deltaY * 0.3;
        
        scrollPosition = Math.max(0, Math.min(100, scrollPosition + scrollStep));
        updateImagePosition();
        
        lastTouchY = currentY;
    };
    
    const handleTouchEnd = () => {
        isDragging = false;
    };
    
    const handleKeydown = (e) => {
        if (!ipadContainer.contains(document.activeElement)) return;
        
        const keyActions = {
            'ArrowUp': () => Math.max(0, scrollPosition - 5),
            'ArrowDown': () => Math.min(100, scrollPosition + 5),
            'Home': () => 0,
            'End': () => 100
        };
        
        const action = keyActions[e.key];
        if (action) {
            e.preventDefault();
            scrollPosition = action();
            requestAnimationFrame(updateImagePosition);
        }
    };
    
    // Event listeners
    const ipadScreen = ipadContainer.querySelector('.ipad-screen');
    if (ipadScreen) {
        ipadScreen.addEventListener('wheel', handleScroll, { passive: false });
        ipadScreen.addEventListener('touchstart', handleTouchStart, { passive: false });
        ipadScreen.addEventListener('touchmove', handleTouchMove, { passive: false });
        ipadScreen.addEventListener('touchend', handleTouchEnd, { passive: false });
    }
    
    ipadContainer.addEventListener('keydown', handleKeydown);
    
    // Accessibility setup
    const progressBar = ipadContainer.querySelector('.ipad-progress-bar');
    if (progressBar) {
        progressBar.style.pointerEvents = 'none';
    }
    
    updateElement(ipadContainer, {
        tabindex: '0',
        role: 'slider',
        'aria-label': '프로젝트 이미지 스크롤',
        'aria-valuemin': '0',
        'aria-valuemax': '100',
        'aria-valuenow': '0'
    });
    
    updateImagePosition();
}

// ===== CONTACT FORM =====
export function initContactForm() {
    const form = DOM_CACHE.get('#contact-form');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, textarea');
    
    const validationRules = {
        email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || '올바른 이메일 주소를 입력해주세요.',
        phone: (value) => /^[0-9-+\s()]{10,}$/.test(value) || '올바른 전화번호를 입력해주세요.',
        message: (value) => value.length >= 10 || '메시지는 최소 10자 이상 입력해주세요.'
    };
    
    const validateField = (field) => {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';
        
        field.classList.remove('valid', 'invalid');
        
        // Required validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = `${getFieldLabel(field)}은(는) 필수 입력 항목입니다.`;
        }
        
        // Specific field validation
        if (value && validationRules[fieldName]) {
            const result = validationRules[fieldName](value);
            if (result !== true) {
                isValid = false;
                errorMessage = result;
            }
        }
        
        // Show validation result
        if (isValid) {
            field.classList.add('valid');
            clearFieldError(field);
        } else {
            field.classList.add('invalid');
            showFieldError(field, errorMessage);
        }
        
        return isValid;
    };
    
    const getFieldLabel = (field) => {
        const label = document.querySelector(`label[for="${field.id}"]`);
        return label ? label.textContent.replace('*', '').trim() : field.name;
    };
    
    const showFieldError = (field, message) => {
        const fieldGroup = field.closest('.form-group');
        if (!fieldGroup) return;
        
        clearFieldError(field);
        
        const feedback = createElement('div', 'field-feedback error', {
            role: 'alert'
        });
        feedback.textContent = message;
        
        fieldGroup.appendChild(feedback);
        field.setAttribute('aria-invalid', 'true');
    };
    
    const clearFieldError = (field) => {
        const fieldGroup = field.closest('.form-group');
        if (fieldGroup) {
            const feedback = fieldGroup.querySelector('.field-feedback');
            if (feedback) feedback.remove();
        }
        field.removeAttribute('aria-invalid');
    };
    
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        
        // Validate all fields
        const isValid = Array.from(inputs).every(input => validateField(input));
        
        if (!isValid) {
            announce('양식을 올바르게 작성해주세요.');
            const firstInvalid = form.querySelector('.invalid');
            if (firstInvalid) firstInvalid.focus();
            return;
        }
        
        // Submit form
        const submitButton = form.querySelector('[type="submit"]');
        const originalText = submitButton.textContent;
        
        updateElement(submitButton, {
            textContent: '전송 중...',
            disabled: 'true'
        });
        
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            announce('메시지가 성공적으로 전송되었습니다!');
            form.reset();
            inputs.forEach(input => clearFieldError(input));
        } catch (error) {
            announce('전송 중 오류가 발생했습니다. 다시 시도해주세요.');
        } finally {
            updateElement(submitButton, {
                textContent: originalText,
                disabled: 'false'
            });
        }
    };
    
    // Event listeners
    inputs.forEach(input => {
        const debouncedValidation = debounce(() => validateField(input), 300);
        input.addEventListener('input', debouncedValidation);
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('focus', () => clearFieldError(input));
    });
    
    form.addEventListener('submit', handleFormSubmit);
}
