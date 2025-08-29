// ===== MAIN APPLICATION ENTRY POINT =====

import { 
    DOM_CACHE, 
    initAOS, 
    initGSAP, 
    initAccessibility, 
    initPerformanceOptimizations 
} from './utils.js';

import { 
    initFloatingNavigation, 
    initProjects, 
    initProjectButtonsScroll, 
    initIpadScroll, 
    initContactForm 
} from './components.js';

// ===== LOADING ANIMATION & CUSTOM SCROLLBAR =====
function initLoadingAnimation() {
    const loadingAnimation = document.getElementById('loading-animation');
    const loadingLogo = document.querySelector('.loading-logo');
    const loadingMessages = document.querySelectorAll('.loading-message');
    const loadingBar = document.querySelector('.loading-bar');
    const mainContent = document.querySelector('main');
    const body = document.body;
    
    if (loadingAnimation && gsap) {
        console.log('🎬 Initializing loading animation...');
        
        // 페이지 로드 시 body에 loading 클래스 추가
        body.classList.add('loading');
        
        // 초기 상태 설정
        gsap.set([loadingLogo, ...loadingMessages], { 
            opacity: 0, 
            y: 30 
        });
        gsap.set(loadingBar, { width: 0 });
        
        // 로딩 애니메이션 타임라인 생성
        const loadingTL = gsap.timeline({
            onComplete: () => {
                console.log('✅ Loading animation completed');
                completeLoading();
            }
        });
        
        // 로고 애니메이션
        loadingTL.to(loadingLogo, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out"
        }, 0.2);
        
        // 메시지 순환 애니메이션
        loadingMessages.forEach((message, index) => {
            const startTime = 0.8 + (index * 0.6);
            
            // 메시지 fade-in
            loadingTL.to(message, {
                opacity: 1,
                y: 0,
                duration: 0.4,
                ease: "power2.out"
            }, startTime);
            
            // 메시지 fade-out (다음 메시지가 나타나기 전)
            loadingTL.to(message, {
                opacity: 0,
                y: -20,
                duration: 0.3,
                ease: "power2.in"
            }, startTime + 0.4);
        });
        
        // 프로그레스 바 애니메이션
        loadingTL.to(loadingBar, {
            width: "100%",
            duration: 2.4, // 4개 메시지 × 0.6초
            ease: "power2.inOut"
        }, 0.8);
        
        // 전체 로딩 애니메이션 fade-out (더 부드럽게)
        loadingTL.to(loadingAnimation, {
            opacity: 0,
            scale: 1.05,
            duration: 1.2,
            ease: "power2.inOut"
        }, 3.2);
        
        // 로딩 애니메이션이 fade-out되는 동안 페이지 콘텐츠를 미리 준비
        if (mainContent) {
            loadingTL.to(mainContent, {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: "power2.out"
            }, 3.3); // 로딩 애니메이션과 겹치도록
        }
    } else {
        console.warn('⚠️ Loading animation elements or GSAP not found');
        // 로딩 애니메이션이 없으면 바로 페이지 표시
        if (mainContent) {
            gsap.set(mainContent, { opacity: 1, y: 0 });
        }
        body.classList.add('loaded');
    }
}

function completeLoading() {
    const body = document.body;
    const loadingAnimation = document.getElementById('loading-animation');
    
    // body에서 loading 클래스 제거하고 loaded 클래스 추가
    body.classList.remove('loading');
    body.classList.add('loaded');
    
    // 로딩 애니메이션 완전히 숨김 (더 자연스럽게)
    gsap.to(loadingAnimation, {
        visibility: "hidden",
        duration: 0.1,
        delay: 1.2
    });
    
    // 페이지 스크롤 활성화
    document.documentElement.style.overflow = 'auto';
    document.body.style.overflow = 'auto';
    
    console.log('🎉 Loading completed, page ready');
}

function initCustomScrollbar() {
    const customScrollbar = document.getElementById('custom-scrollbar');
    const scrollbarThumb = document.querySelector('.scrollbar-thumb');
    const body = document.body;
    
    if (customScrollbar && scrollbarThumb) {
        console.log('🎯 Initializing custom scrollbar...');
        
        let isDragging = false;
        let startY = 0;
        let startScrollTop = 0;
        
        // 스크롤바 표시/숨김
        function toggleScrollbar() {
            const scrollHeight = document.documentElement.scrollHeight;
            const clientHeight = document.documentElement.clientHeight;
            
            if (scrollHeight > clientHeight) {
                customScrollbar.classList.add('visible');
                body.classList.add('has-custom-scrollbar');
            } else {
                customScrollbar.classList.remove('visible');
                body.classList.remove('has-custom-scrollbar');
            }
        }
        
        // 스크롤바 위치 업데이트
        function updateScrollbarPosition() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
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
        }
        
        // 스크롤바 드래그 시작
        function startDragging(e) {
            isDragging = true;
            startY = e.clientY;
            startScrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            customScrollbar.classList.add('dragging');
            document.body.style.userSelect = 'none';
            
            document.addEventListener('mousemove', handleDragging);
            document.addEventListener('mouseup', stopDragging);
        }
        
        // 스크롤바 드래그 중
        function handleDragging(e) {
            if (!isDragging) return;
            
            const deltaY = e.clientY - startY;
            const scrollHeight = document.documentElement.scrollHeight;
            const clientHeight = document.documentElement.clientHeight;
            const maxScroll = scrollHeight - clientHeight;
            
            const scrollPercentage = deltaY / (window.innerHeight - scrollbarThumb.offsetHeight);
            const newScrollTop = startScrollTop + (scrollPercentage * maxScroll);
            
            window.scrollTo(0, Math.max(0, Math.min(newScrollTop, maxScroll)));
        }
        
        // 스크롤바 드래그 종료
        function stopDragging() {
            isDragging = false;
            customScrollbar.classList.remove('dragging');
            document.body.style.userSelect = '';
            
            document.removeEventListener('mousemove', handleDragging);
            document.removeEventListener('mouseup', stopDragging);
        }
        
        // 이벤트 리스너 등록
        scrollbarThumb.addEventListener('mousedown', startDragging);
        
        // 스크롤 이벤트
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            updateScrollbarPosition();
            
            // 스크롤 중일 때만 스크롤바 표시
            customScrollbar.classList.add('visible');
            
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                // 스크롤이 멈춘 후 2초 뒤에 스크롤바 숨김
                if (!isDragging) {
                    customScrollbar.classList.remove('visible');
                }
            }, 2000);
        });
        
        // 리사이즈 이벤트
        window.addEventListener('resize', () => {
            toggleScrollbar();
            updateScrollbarPosition();
        });
        
        // 초기 설정
        toggleScrollbar();
        updateScrollbarPosition();
        
        // 로딩 완료 후 스크롤바 활성화
        setTimeout(() => {
            toggleScrollbar();
            updateScrollbarPosition();
        }, 4000);
        
        console.log('✅ Custom scrollbar initialized');
    } else {
        console.warn('⚠️ Custom scrollbar elements not found');
    }
}

// ===== MAIN INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Initializing application...');
    
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
            
            // Loading animation and custom scrollbar
            initLoadingAnimation();
            initCustomScrollbar();
            
            console.log('✅ Application initialized successfully');
            
            // Performance logging
            if ('performance' in window) {
                const navigation = performance.getEntriesByType('navigation')[0];
                console.log(`📊 DOM Content Loaded: ${Math.round(navigation.domContentLoadedEventEnd)}ms`);
                console.log(`📊 Page Load Complete: ${Math.round(navigation.loadEventEnd)}ms`);
            }
            
        } catch (error) {
            console.error('❌ Initialization error:', error);
            
            // Show user-friendly error message
            const errorDiv = document.createElement('div');
            errorDiv.innerHTML = `
                <div style="
                    position: fixed; 
                    top: 20px; 
                    right: 20px; 
                    background: #f44336; 
                    color: white; 
                    padding: 15px; 
                    border-radius: 5px; 
                    z-index: 9999;
                    font-family: sans-serif;
                ">
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
                </div>
            `;
            document.body.appendChild(errorDiv);
            
            // Auto-remove after 10 seconds
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
        reinitialize: () => {
            location.reload();
        },
        performance: () => {
            if ('performance' in window) {
                const navigation = performance.getEntriesByType('navigation')[0];
                const resources = performance.getEntriesByType('resource');
                console.table({
                    'DOM Content Loaded': `${Math.round(navigation.domContentLoadedEventEnd)}ms`,
                    'Page Load Complete': `${Math.round(navigation.loadEventEnd)}ms`,
                    'Resources Loaded': resources.length
                });
            }
        }
    };
    
    console.log('🛠️ Development mode enabled. Use window.debugApp for debugging.');
}

// ===== MAIN JAVASCRIPT FILE =====

// ===== STICKY NAVIGATION =====
document.addEventListener('DOMContentLoaded', function() {
    const stickyNavToggle = document.querySelector('.sticky-nav-toggle');
    const stickyNavMenu = document.querySelector('.sticky-nav-menu');
    const stickyNavLinks = document.querySelectorAll('.sticky-nav-link');
    
    if (stickyNavToggle && stickyNavMenu) {
        // 햄버거 메뉴 토글
        stickyNavToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            this.classList.toggle('active');
            stickyNavMenu.classList.toggle('active');
        });
        
        // 메뉴 링크 클릭 시 메뉴 닫기
        stickyNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                stickyNavToggle.setAttribute('aria-expanded', 'false');
                stickyNavToggle.classList.remove('active');
                stickyNavMenu.classList.remove('active');
            });
        });
        
        // 메뉴 외부 클릭 시 메뉴 닫기
        document.addEventListener('click', function(event) {
            if (!stickyNavToggle.contains(event.target) && !stickyNavMenu.contains(event.target)) {
                stickyNavToggle.setAttribute('aria-expanded', 'false');
                stickyNavToggle.classList.remove('active');
                stickyNavMenu.classList.remove('active');
            }
        });
    }
});

// ===== FLOATING NAVIGATION =====
document.addEventListener('DOMContentLoaded', function() {
    const navDots = document.querySelectorAll('.nav-dot');
    const sections = document.querySelectorAll('section[id]');
    
    // 스크롤 시 현재 섹션 감지
    function updateActiveNav() {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                // 현재 활성 네비게이션 업데이트
                navDots.forEach(dot => {
                    dot.classList.remove('active');
                    if (dot.getAttribute('href') === `#${sectionId}`) {
                        dot.classList.add('active');
                    }
                });
                
                // sticky 네비게이션도 업데이트
                const stickyNavLink = document.querySelector(`.sticky-nav-link[href="#${sectionId}"]`);
                if (stickyNavLink) {
                    document.querySelectorAll('.sticky-nav-link').forEach(link => {
                        link.classList.remove('active');
                    });
                    stickyNavLink.classList.add('active');
                }
            }
        });
    }
    
    // 스크롤 이벤트 리스너
    window.addEventListener('scroll', updateActiveNav);
    
    // 초기 활성 상태 설정
    updateActiveNav();
});

// ===== PROJECT TABS =====
document.addEventListener('DOMContentLoaded', function() {
    const projectButtons = document.querySelectorAll('[data-project]');
    const projectPanels = document.querySelectorAll('.project-info');
    const projectImages = document.querySelector('.project-image');
    
    if (projectButtons.length > 0) {
        projectButtons.forEach(button => {
            button.addEventListener('click', function() {
                const projectIndex = this.getAttribute('data-project');
                
                // 모든 버튼에서 active 클래스 제거
                projectButtons.forEach(btn => btn.classList.remove('active'));
                // 모든 패널 숨기기
                projectPanels.forEach(panel => panel.style.display = 'none');
                
                // 클릭된 버튼 활성화
                this.classList.add('active');
                // 해당 패널 표시
                const targetPanel = document.getElementById(`project-panel-${projectIndex}`);
                if (targetPanel) {
                    targetPanel.style.display = 'block';
                }
                
                // 프로젝트 이미지 변경 (이미지가 있는 경우)
                if (projectImages) {
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
                    
                    if (projectImagesList[projectIndex]) {
                        projectImages.src = projectImagesList[projectIndex];
                        projectImages.alt = `프로젝트 ${parseInt(projectIndex) + 1} 미리보기`;
                    }
                }
            });
        });
    }
});

// ===== SMOOTH SCROLLING =====
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // sticky nav 높이만큼 조정
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// ===== AOS INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }
});

// ===== FORM VALIDATION =====
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 간단한 폼 검증
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !subject || !message) {
                showSubmitStatus('모든 필드를 입력해주세요.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showSubmitStatus('올바른 이메일 주소를 입력해주세요.', 'error');
                return;
            }
            
            // 폼 제출 성공 시뮬레이션
            showSubmitStatus('메시지가 성공적으로 전송되었습니다!', 'success');
            contactForm.reset();
        });
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showSubmitStatus(message, type) {
        const statusElement = document.getElementById('submit-status');
        if (statusElement) {
            statusElement.textContent = message;
            statusElement.className = `submit-status ${type}`;
            
            setTimeout(() => {
                statusElement.textContent = '';
                statusElement.className = 'submit-status';
            }, 5000);
        }
    }
});

// ===== SCROLL TO TOP =====
document.addEventListener('DOMContentLoaded', function() {
    // 스크롤 시 스크롤 인디케이터 표시/숨김
    const scrollIndicator = document.querySelector('.hero-scroll-indicator');
    
    if (scrollIndicator) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '1';
            }
        });
    }
});
