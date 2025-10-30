// Portfolio Components

// Loading Animation
function initLoadingAnimation() {
    const loadingAnimation = document.getElementById('loading-animation');
    const loadingLogo = document.querySelector('.loading-logo');
    const loadingMessages = document.querySelectorAll('.loading-message');
    const loadingBar = document.querySelector('.loading-bar');
    const mainContent = document.querySelector('main');
    const body = document.body;
    
    if (!loadingAnimation) {
        if (mainContent) {
            mainContent.style.opacity = '1';
        }
        body.classList.add('loaded');
        return;
    }
    
    // Initial state
    body.classList.add('loading');
    if (loadingLogo) loadingLogo.style.opacity = '0';
    if (loadingBar) loadingBar.style.width = '0%';
    
    // Typing animation for logo
    if (loadingLogo && loadingLogo.classList.contains('typing-message')) {
        const text = loadingLogo.getAttribute('data-text');
        loadingLogo.textContent = '';
        
        setTimeout(() => {
            loadingLogo.style.opacity = '1';
            loadingLogo.style.transform = 'translateY(0)';
            
            // Start typing effect
            let index = 0;
            const typeInterval = setInterval(() => {
                if (index < text.length) {
                    loadingLogo.textContent += text[index];
                    index++;
                } else {
                    clearInterval(typeInterval);
                    loadingLogo.classList.add('typing-complete');
                    
                    // Start sub messages after typing is complete
                    setTimeout(() => {
                        animateSubMessages();
                    }, 500);
                }
            }, 150); // Typing speed: 150ms per character for logo
        }, 200);
    }
    
    // Animate sub messages function
    function animateSubMessages() {
        loadingMessages.forEach((message, index) => {
            setTimeout(() => {
                message.style.opacity = '1';
                message.style.transform = 'translateY(0)';
            }, index * 600);
            
            setTimeout(() => {
                message.style.opacity = '0';
                message.style.transform = 'translateY(-20px)';
            }, 400 + (index * 600));
        });
        
        // Start progress bar after sub messages start
        if (loadingBar) {
            setTimeout(() => {
                loadingBar.style.width = '100%';
            }, 200);
        }
        
        // Complete loading after all sub messages finish
        setTimeout(() => {
            body.classList.remove('loading');
            body.classList.add('loaded');
            if (loadingAnimation) {
                loadingAnimation.style.opacity = '0';
                setTimeout(() => {
                    loadingAnimation.style.visibility = 'hidden';
                }, 1200);
            }
        }, 2000 + (loadingMessages.length * 600)); // Wait for all sub messages to finish
    }
}

// Floating Navigation
function initFloatingNavigation() {
    const floatingNav = document.querySelector('.floating-nav');
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
        
        // Show/hide floating nav
        if (scrollPosition > windowHeight * 0.3) {
            floatingNav.classList.add('visible');
        } else {
            floatingNav.classList.remove('visible');
        }
    }, 100);
    
    // Event listeners
    navDots.forEach(dot => dot.addEventListener('click', handleNavClick));
    window.addEventListener('scroll', handleScroll);
    handleScroll();
}

// Projects
function initProjects() {
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
            elements.image.src = project.image;
            elements.image.alt = `${project.title} 미리보기`;
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
            info.style.display = isVisible ? 'flex' : 'none';
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

// Tab Progress Bar
function animateTabProgress(activeIndex, totalTabs) {
    const progressFill = document.querySelector('.tab-progress-fill');
    if (!progressFill) return;
    
    const progress = ((activeIndex + 1) / totalTabs) * 100;
    
    progressFill.style.width = `${progress}%`;
    progressFill.style.background = `linear-gradient(90deg, 
        rgba(5, 150, 105, 0.9), 
        rgba(16, 185, 129, 0.9)
    )`;
}

// Project Buttons Horizontal Scroll
function initProjectButtonsScroll() {
    const scrollContainer = document.querySelector('.project-tabs-container');
    const progressBar = document.querySelector('.tab-progress-bar');
    const progressFill = document.querySelector('.tab-progress-fill');
    
    if (!scrollContainer) return;

    const updateProgressBar = () => {
        if (!progressBar || !progressFill) return;
        
        const scrollLeft = scrollContainer.scrollLeft;
        const scrollWidth = scrollContainer.scrollWidth - scrollContainer.clientWidth;
        const progress = scrollWidth > 0 ? (scrollLeft / scrollWidth) * 100 : 0;
        
        progressFill.style.width = `${Math.max(0, Math.min(100, progress))}%`;
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

    // Initialize
    updateProgressBar();
    window.addEventListener('resize', updateProgressBar);
}

// iPad Scroll
function initIpadScroll() {
    const ipadContainer = document.querySelector('.projects-ipad-container .ipad-frame');
    const projectImage = document.querySelector('.project-image');
    
    if (!ipadContainer || !projectImage) return;
    
    let scrollPosition = 0;
    let isDragging = false;
    let lastTouchY = 0;
    
    const updateImagePosition = () => {
        const objectPosition = `center ${scrollPosition}%`;
        projectImage.style.objectPosition = objectPosition;
        
        // Update home button style progress bar
        const progressFill = document.querySelector('.progress-fill');
        const progressText = document.querySelector('.progress-text');
        
        if (progressFill) {
            const percentage = scrollPosition;
            const degrees = (percentage / 100) * 360;
            progressFill.style.background = `conic-gradient(from 0deg, var(--primary) 0deg, var(--primary) ${degrees}deg, transparent ${degrees}deg)`;
        }
        
        if (progressText) {
            progressText.textContent = `${Math.round(scrollPosition)}%`;
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
    
    // Event listeners
    const ipadScreen = ipadContainer.querySelector('.ipad-screen');
    if (ipadScreen) {
        ipadScreen.addEventListener('wheel', handleScroll, { passive: false });
        ipadScreen.addEventListener('touchstart', handleTouchStart, { passive: false });
        ipadScreen.addEventListener('touchmove', handleTouchMove, { passive: false });
        ipadScreen.addEventListener('touchend', handleTouchEnd, { passive: false });
    }
    
    // Accessibility setup
    ipadContainer.setAttribute('tabindex', '0');
    ipadContainer.setAttribute('role', 'slider');
    ipadContainer.setAttribute('aria-label', '프로젝트 이미지 스크롤');
    ipadContainer.setAttribute('aria-valuemin', '0');
    ipadContainer.setAttribute('aria-valuemax', '100');
    ipadContainer.setAttribute('aria-valuenow', '0');
    
    updateImagePosition();
}

// Contact Form
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, textarea');
    
    const validationRules = {
        email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || '올바른 이메일 주소를 입력해주세요.',
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
        
        const feedback = document.createElement('div');
        feedback.className = 'field-feedback error';
        feedback.setAttribute('role', 'alert');
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
            form.reset();
            inputs.forEach(input => clearFieldError(input));
            
            // Show success message
            const statusElement = document.getElementById('submit-status');
            if (statusElement) {
                statusElement.textContent = '메시지가 성공적으로 전송되었습니다!';
                statusElement.className = 'submit-status success';
                
                setTimeout(() => {
                    statusElement.textContent = '';
                    statusElement.className = 'submit-status';
                }, 5000);
            }
        } catch (error) {
            console.error('Form submission error:', error);
        } finally {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
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

// Project Modals
function initProjectModals() {
    console.log('Initializing project modals...');
    
    const $modal = $('#projectModal');
    const $modalContent = $('#projectModalContent');
    const $modalTitle = $('#projectModalLabel');
    
    console.log('Modal elements found:', {
        modal: $modal.length,
        content: $modalContent.length,
        title: $modalTitle.length
    });
    
    if ($modal.length === 0 || $modalContent.length === 0) {
        console.error('Modal elements not found!');
        return;
    }
    
    const projectDetails = {
        hycu: {
            title: 'HYCU 졸업전시회 프로젝트',
            case: {
                html: '80%',
                css: '80%',
                js: '0%'
            },
            responsibilities: [
                '한양사이버대학교 졸업작품 웹사이트 제작 및 유지보수',
                '졸업작품 웹페이지 마크업',
                '이미지 최적화 및 성능 개선',
                'SASS 사용'
            ]
        },
        urscope: {
            title: 'URSCOPE 프로젝트',
            case: {
                html: '100%',
                css: '100%',
                js: '60%'
            },
            responsibilities: [
                '기업 웹사이트 제작 및 리뉴얼',
                '반응형 웹사이트 제작',
                '디자이너, 개발자와의 협업 및 피드백 반영',
                '레이아웃, 스타일 작업 및 공통부분 컴포넌트화'
            ]
        },
        kmr: {
            title: 'KMR(한국경영인증원) 프로젝트',
            case: {
                html: '90%',
                css: '60%',
                js: '0%'
            },
            responsibilities: [
                '한국경영인증원 공식 웹사이트 제작 및 유지보수',
                '웹사이트 마크업',
                '웹 접근성 가이드라인 준수',
                '레이아웃, 스타일 작업 및 공통부분 컴포넌트화',
                'SASS 사용'
            ]
        },
        corfa: {
            title: 'Corfa(연구관리혁신협의회) 프로젝트',
            case: {
                html: '100%',
                css: '100%',
                js: '0%'
            },
            responsibilities: [
                '연구관리혁신협의회 웹사이트 유지보수',
                'UTF-8 인코딩 적용',
                'FileZilla 파일 업로드 및 다운로드',
                '페이지 내부 테이블 최신화'
            ]
        },
        landing: {
            title: '랜딩페이지 제작 프로젝트',
            case: {
                html: '100%',
                css: '100%',
                js: '0%'
            },
            responsibilities: [
                '포트폴리오 랜딩페이지 디자인 구현',
                'FIGMA 디자인툴 활용',
                '공통부분 컴포넌트화',
                'SASS 사용'
            ]
        },
        smartppt: {
            title: 'SmartPPT2024 프로젝트',
            case: {
                html: '100%',
                css: '100%',
                js: '0%'
            },
            responsibilities: [
                '교육 콘텐츠 인터페이스 구현',
                '데이터타입 분류로 Navigation 구현',
                '공통부분 컴포넌트화',
            ]
        },
        aidt: {
            title: 'AIDT 초등수학 프로젝트',
            case: {
                html: '100%',
                css: '100%',
                js: '70%'
            },
            responsibilities: [
                '초등학생 대상 수학 게임 제작 및 유지보수',
                '초등학생 대상 수학 게임 마크업',
                '반응형 전자교과서 제작',
                'AI를 이용한 교육 게임 로직 구현'
            ]
        },
        iscream: {
            title: 'i-scream 전자저작물 프로젝트',
            case: {
                html: '100%',
                css: '100%',
                js: '0%'
            },
            responsibilities: [
                '전자저작물 멀티미디어 인터페이스 제작',
                '전자저작물 멀티미디어 마크업',
                '전자저작물 멀티미디어 최적화',
                '전자저작물 멀티미디어 공통부분 컴포넌트화',
            ]
        },
        mmath: {
            title: '능률 중등수학 프로젝트',
            case: {
                html: '100%',
                css: '100%',
                js: '0%'
            },
            responsibilities: [
                '중등수학 교재 디지털 콘텐츠 제작',
                '중등수학 교재 마크업',
                '중등수학 교재 최적화',
                '중등수학 교재 공통부분 컴포넌트화',
            ]
        }
    };
    
    const showProjectDetail = (projectKey) => {
        const project = projectDetails[projectKey];
        if (!project) return;
        
        $modalTitle.text(project.title);
        $modalContent.html(`
            <div class="project-detail-content">
                <div class="detail-section">
                    <h4 class="detail-title">담당 업무</h4>
                    <ul class="responsibility-list">
                        ${project.responsibilities.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
                <div class="detail-section">
                    <h4 class="detail-title">기여도</h4>
                    <div class="case-study">
                        <div class="case-item">
                            <strong>HTML:</strong> ${project.case.html}
                        </div>
                        <div class="case-item">
                            <strong>CSS:</strong> ${project.case.css}
                        </div>
                        <div class="case-item">
                            <strong>JS:</strong> ${project.case.js}
                        </div>
                    </div>
                </div>
                
                
            </div>
        `);
    };
    
    // Bootstrap 4 modal event listeners with jQuery
    $modal.on('show.bs.modal', function (event) {
        console.log('Modal show event triggered');
        const button = $(event.relatedTarget);
        const projectKey = button.data('project');
        console.log('Project key:', projectKey);
        showProjectDetail(projectKey);
        
        // Prevent body scroll when modal is open
        $('body').addClass('modal-open-custom');
    });
    
    $modal.on('hidden.bs.modal', function () {
        console.log('Modal hidden event triggered');
        // Restore body scroll when modal is closed
        $('body').removeClass('modal-open-custom');
    });
    
    // Also add click event for debugging
    $('[data-toggle="modal"]').on('click', function() {
        console.log('Modal trigger button clicked:', $(this).data('project'));
    });
    
    console.log('Project modals initialized successfully');
}

// Smooth Scrolling
function smoothScrollTo(targetId, offset = 80) {
    const target = document.getElementById(targetId);
    if (target) {
        const targetPosition = target.offsetTop - offset;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}
