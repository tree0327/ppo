// ===== COMPONENTS - ALL UI FUNCTIONALITY =====

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

// ===== FLOATING NAVIGATION =====
export function initFloatingNavigation() {
    const floatingNav = DOM_CACHE.get('.floating-nav');
    if (!floatingNav) {
        console.warn('Floating navigation not found');
        return;
    }
    
    const navDots = floatingNav.querySelectorAll('.nav-dot');
    const sections = document.querySelectorAll('section[id]');
    
    console.log('Floating nav found:', floatingNav);
    console.log('Nav dots found:', navDots.length);
    console.log('Sections found:', sections.length);
    
    if (navDots.length === 0 || sections.length === 0) return;
    
    // Handle navigation clicks
    navDots.forEach(dot => {
        // dot 자체가 링크입니다
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = dot.getAttribute('href').substring(1);
            smoothScrollTo(targetId);
            
            // Update active state
            navDots.forEach(otherDot => otherDot.classList.remove('active'));
            dot.classList.add('active');
            
            console.log('Navigation clicked:', targetId); // 디버그
        });
    });
    
    // Handle scroll detection
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
            const correspondingDot = Array.from(navDots).find(dot => {
                return dot.getAttribute('href') === `#${activeSectionId}`;
            });
            
            if (correspondingDot) {
                navDots.forEach(dot => dot.classList.remove('active'));
                correspondingDot.classList.add('active');
            }
        }
    }, 100);
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    console.log('Floating navigation initialized');
}

// ===== PROJECTS =====
export function initProjects() {
    const projectButtons = document.querySelectorAll('.project-buttons-list .btn');
    const projectInfos = document.querySelectorAll('.project-info');
    
    if (projectButtons.length === 0) return;
    
    projectButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            // Update button states
            projectButtons.forEach((btn, i) => {
                btn.classList.toggle('active', i === index);
                btn.setAttribute('aria-pressed', i === index);
            });
            
            // Update project info visibility
            projectInfos.forEach((info, i) => {
                info.classList.toggle('active', i === index);
                info.setAttribute('aria-hidden', i !== index);
            });
            
            // Update project display
            const project = projectData[index];
            if (project) {
                const projectImage = document.querySelector('.project-image');
                const projectTitle = document.querySelector('.project-title');
                const projectDesc = document.querySelector('.project-desc');
                const projectTags = document.querySelector('.project-tags');
                
                if (projectImage) {
                    projectImage.src = project.image;
                    projectImage.alt = `${project.title} 미리보기`;
                }
                
                if (projectTitle) {
                    projectTitle.textContent = project.title;
                }
                
                if (projectDesc) {
                    projectDesc.textContent = project.description;
                }
                
                if (projectTags) {
                    projectTags.innerHTML = project.tags.map(tag => 
                        `<span class="badge badge-tech">${tag}</span>`
                    ).join('');
                }
            }
        });
    });
    
    // Initialize first project
    if (projectButtons.length > 0) {
        projectButtons[0].click();
    }
    
    console.log('Projects initialized');
}

// ===== PROJECT BUTTONS HORIZONTAL SCROLL =====
export function initProjectButtonsScroll() {
    const scrollContainer = document.querySelector('.project-buttons-list');
    const progressBar = document.querySelector('.buttons-progress-bar');
    const progressFill = document.querySelector('.buttons-progress-fill');
    
    if (!scrollContainer || !progressBar || !progressFill) {
        console.warn('Project buttons scroll elements not found');
        return;
    }

    // 프로그레스바 업데이트 함수
    function updateProgressBar() {
        const scrollLeft = scrollContainer.scrollLeft;
        const scrollWidth = scrollContainer.scrollWidth - scrollContainer.clientWidth;
        const progress = scrollWidth > 0 ? (scrollLeft / scrollWidth) * 100 : 0;
        
        progressFill.style.width = `${Math.max(0, Math.min(100, progress))}%`;
    }

    // 스크롤 이벤트 리스너
    scrollContainer.addEventListener('scroll', updateProgressBar);

    // 마우스 휠 이벤트 (가로 스크롤)
    scrollContainer.addEventListener('wheel', (e) => {
        e.preventDefault();
        const scrollAmount = e.deltaY * 2; // 스크롤 속도 조정
        scrollContainer.scrollLeft += scrollAmount;
    });

    // 드래그 스크롤 구현
    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;

    // 마우스 다운
    scrollContainer.addEventListener('mousedown', (e) => {
        if (e.target.closest('.btn')) return; // 버튼 클릭은 제외
        
        isDragging = true;
        startX = e.pageX;
        scrollLeft = scrollContainer.scrollLeft;
        scrollContainer.style.cursor = 'grabbing';
        scrollContainer.style.userSelect = 'none';
        e.preventDefault();
    });

    // 마우스 무브
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        
        const x = e.pageX;
        const walk = (startX - x) * 1.5; // 스크롤 속도 조정
        scrollContainer.scrollLeft = scrollLeft + walk;
    });

    // 마우스 업 및 리브
    const stopDragging = () => {
        if (isDragging) {
            isDragging = false;
            scrollContainer.style.cursor = 'default';
            scrollContainer.style.userSelect = 'auto';
        }
    };

    document.addEventListener('mouseup', stopDragging);
    scrollContainer.addEventListener('mouseleave', stopDragging);

    // 터치 이벤트 (모바일)
    let touchStartX = 0;
    let touchScrollLeft = 0;

    scrollContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchScrollLeft = scrollContainer.scrollLeft;
    }, { passive: true });

    scrollContainer.addEventListener('touchmove', (e) => {
        const touchX = e.touches[0].clientX;
        const walk = (touchStartX - touchX) * 1.5; // 터치 스크롤 속도
        scrollContainer.scrollLeft = touchScrollLeft + walk;
    }, { passive: true });

    // 프로그레스바 클릭으로 이동
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

    // 초기 프로그레스바 설정 및 리사이즈 이벤트
    updateProgressBar();
    
    window.addEventListener('resize', updateProgressBar);

    console.log('Project buttons horizontal scroll initialized');
    console.log('Scroll container:', scrollContainer);
    console.log('Progress bar:', progressBar);
}

// ===== IPAD SCROLL =====
export function initIpadScroll() {
    const ipadContainer = DOM_CACHE.ipadContainer?.querySelector('.ipad-frame') || 
                          document.querySelector('.projects-ipad-container .ipad-frame');
    const projectImageContainer = document.querySelector('.project-image-container');
    const projectImage = document.querySelector('.project-image');
    
    if (!ipadContainer || !projectImageContainer || !projectImage) return;
    
    let scrollPosition = 0; // 0-100%
    let isDragging = false;
    let touchStartY = 0;
    let lastTouchY = 0;
    let touchVelocity = 0;
    let lastTouchTime = 0;
    
    function updateImagePosition() {
        const objectPosition = `center ${scrollPosition}%`;
        projectImage.style.objectPosition = objectPosition;
        
        // Visual feedback at bounds
        let filter = 'brightness(1.1) contrast(1.05)';
        if (scrollPosition <= 5 || scrollPosition >= 95) {
            filter += ' saturate(0.9)';
        }
        projectImage.style.filter = filter;
        
        // Update progress bar
        const progressFill = document.querySelector('.progress-fill');
        const progressText = document.querySelector('.progress-text');
        
        if (progressFill) {
            progressFill.style.width = `${scrollPosition}%`;
            if (scrollPosition <= 10 || scrollPosition >= 90) {
                progressFill.style.background = 'linear-gradient(90deg, #ff6b6b, #feca57)';
            } else {
                progressFill.style.background = 'linear-gradient(90deg, #D4B996, #A67B5B)';
            }
        }
        
        if (progressText) {
            progressText.textContent = `${Math.round(scrollPosition)}%`;
            if (scrollPosition <= 10 || scrollPosition >= 90) {
                progressText.style.color = '#ff6b6b';
            } else {
                progressText.style.color = '#D4B996';
            }
        }
        
        // ARIA updates
        ipadContainer.setAttribute('aria-valuenow', Math.round(scrollPosition));
    }
    
    // Simplified scroll handling
    let isMouseOverIpad = false;
    
    // Simple and reliable scroll handler
    function handleScroll(e) {
        e.preventDefault();
        e.stopPropagation();
        
        console.log('Scroll event:', e.deltaY); // Debug log
        
        const delta = e.deltaY;
        const scrollStep = Math.abs(delta) * 0.15; // Increased sensitivity
        
        if (delta > 0) {
            scrollPosition = Math.min(100, scrollPosition + scrollStep);
        } else {
            scrollPosition = Math.max(0, scrollPosition - scrollStep);
        }
        
        updateImagePosition();
        return false;
    }
    
    // Simple mouse enter handler
    function handleMouseEnter() {
        isMouseOverIpad = true;
        console.log('Mouse entered iPad');
        
        // Disable page scroll
        document.body.style.overflow = 'hidden';
        
        // Visual feedback
        ipadContainer.style.transform = 'translateY(-8px) rotateX(3deg) rotateY(-3deg)';
        ipadContainer.style.boxShadow = `
            0 40px 100px rgba(0, 0, 0, 0.5),
            0 15px 40px rgba(0, 0, 0, 0.3),
            0 0 0 1px rgba(212, 185, 150, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.2)
        `;
    }
    
    // Simple mouse leave handler
    function handleMouseLeave() {
        isMouseOverIpad = false;
        console.log('Mouse left iPad');
        
        // Re-enable page scroll
        document.body.style.overflow = '';
        
        // Remove visual feedback
        ipadContainer.style.transform = '';
        ipadContainer.style.boxShadow = '';
    }
    
    // Simplified touch events
    function handleTouchStart(e) {
        e.preventDefault();
        touchStartY = e.touches[0].clientY;
        lastTouchY = touchStartY;
        isDragging = true;
        touchVelocity = 0;
        lastTouchTime = Date.now();
        console.log('Touch start');
    }
    
    function handleTouchMove(e) {
        if (!isDragging) return;
        e.preventDefault();
        
        const currentY = e.touches[0].clientY;
        const deltaY = lastTouchY - currentY;
        const scrollStep = deltaY * 0.3;
        
        scrollPosition = Math.max(0, Math.min(100, scrollPosition + scrollStep));
        updateImagePosition();
        
        lastTouchY = currentY;
    }
    
    function handleTouchEnd() {
        isDragging = false;
        console.log('Touch end');
    }
    
    // Keyboard navigation
    function handleKeydown(e) {
        if (!ipadContainer.contains(document.activeElement)) return;
        
        switch(e.key) {
            case 'ArrowUp':
                e.preventDefault();
                scrollPosition = Math.max(0, scrollPosition - 5);
                requestAnimationFrame(updateImagePosition);
                break;
            case 'ArrowDown':
                e.preventDefault();
                scrollPosition = Math.min(100, scrollPosition + 5);
                requestAnimationFrame(updateImagePosition);
                break;
            case 'Home':
                e.preventDefault();
                scrollPosition = 0;
                requestAnimationFrame(updateImagePosition);
                break;
            case 'End':
                e.preventDefault();
                scrollPosition = 100;
                requestAnimationFrame(updateImagePosition);
                break;
        }
    }
    
    // Simple event listeners - only on necessary elements
    const ipadScreen = ipadContainer.querySelector('.ipad-screen');
    
    // Add events to iPad screen only
    if (ipadScreen) {
        ipadScreen.addEventListener('wheel', handleScroll, { passive: false });
        ipadScreen.addEventListener('touchstart', handleTouchStart, { passive: false });
        ipadScreen.addEventListener('touchmove', handleTouchMove, { passive: false });
        ipadScreen.addEventListener('touchend', handleTouchEnd, { passive: false });
        
        console.log('Event listeners added to iPad screen');
    }
    
    // Mouse enter/leave on main container
    ipadContainer.addEventListener('mouseenter', handleMouseEnter);
    ipadContainer.addEventListener('mouseleave', handleMouseLeave);
    
    // Keyboard events on the main container
    ipadContainer.addEventListener('keydown', handleKeydown);
    
    // Ensure progress bar doesn't block events
    const progressBar = ipadContainer.querySelector('.ipad-progress-bar');
    if (progressBar) {
        progressBar.style.pointerEvents = 'none';
    }
    
    // Setup accessibility
    ipadContainer.setAttribute('tabindex', '0');
    ipadContainer.setAttribute('role', 'slider');
    ipadContainer.setAttribute('aria-label', '프로젝트 이미지 스크롤');
    ipadContainer.setAttribute('aria-valuemin', '0');
    ipadContainer.setAttribute('aria-valuemax', '100');
    ipadContainer.setAttribute('aria-valuenow', '0');
    
    // Initialize
    updateImagePosition();
    
    console.log('iPad scroll initialized');
    console.log('iPad container:', ipadContainer);
    console.log('iPad screen:', ipadScreen);
    console.log('Project image container:', projectImageContainer);
    
    // Test function for debugging
    window.testIpadScroll = function() {
        console.log('Current scroll position:', scrollPosition);
        console.log('Mouse over iPad:', isMouseOverIpad);
        scrollPosition = 50;
        updateImagePosition();
        console.log('Set scroll to 50%');
    };
}

// ===== CONTACT FORM =====
export function initContactForm() {
    const form = DOM_CACHE.get('#contact-form');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, textarea');
    
    // Form validation
    function validateField(field) {
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
        
        // Email validation
        if (fieldName === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = '올바른 이메일 주소를 입력해주세요.';
            }
        }
        
        // Phone validation
        if (fieldName === 'phone' && value) {
            const phoneRegex = /^[0-9-+\s()]{10,}$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                errorMessage = '올바른 전화번호를 입력해주세요.';
            }
        }
        
        // Message length validation
        if (fieldName === 'message' && value) {
            if (value.length < 10) {
                isValid = false;
                errorMessage = '메시지는 최소 10자 이상 입력해주세요.';
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
    }
    
    function getFieldLabel(field) {
        const label = document.querySelector(`label[for="${field.id}"]`);
        return label ? label.textContent.replace('*', '').trim() : field.name;
    }
    
    function showFieldError(field, message) {
        const fieldGroup = field.closest('.form-group');
        if (!fieldGroup) return;
        
        clearFieldError(field);
        
        const feedback = document.createElement('div');
        feedback.className = 'field-feedback error';
        feedback.textContent = message;
        feedback.setAttribute('role', 'alert');
        
        fieldGroup.appendChild(feedback);
        field.setAttribute('aria-invalid', 'true');
    }
    
    function clearFieldError(field) {
        const fieldGroup = field.closest('.form-group');
        if (fieldGroup) {
            const feedback = fieldGroup.querySelector('.field-feedback');
            if (feedback) feedback.remove();
        }
        field.removeAttribute('aria-invalid');
    }
    
    // Event listeners
    inputs.forEach(input => {
        const debouncedValidation = debounce(() => validateField(input), 300);
        input.addEventListener('input', debouncedValidation);
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('focus', () => clearFieldError(input));
    });
    
    // Form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validate all fields
        let isFormValid = true;
        inputs.forEach(input => {
            if (!validateField(input)) {
                isFormValid = false;
            }
        });
        
        if (!isFormValid) {
            announce('양식을 올바르게 작성해주세요.');
            const firstInvalid = form.querySelector('.invalid');
            if (firstInvalid) firstInvalid.focus();
            return;
        }
        
        // Submit form
        const submitButton = form.querySelector('[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = '전송 중...';
        submitButton.disabled = true;
        
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            announce('메시지가 성공적으로 전송되었습니다!');
            form.reset();
            inputs.forEach(input => clearFieldError(input));
        } catch (error) {
            announce('전송 중 오류가 발생했습니다. 다시 시도해주세요.');
        } finally {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    });
    
    console.log('Contact form initialized');
}
