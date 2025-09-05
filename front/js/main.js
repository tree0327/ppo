// Portfolio Main Application

// Utility Functions
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
};

const throttle = (func, limit) => {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

// Project Data
const projectData = [
    {
        id: 0,
        title: 'HYCU 졸업전시회 프로젝트',
        description: '한양사이버대학교 19기 5차 졸업전시회 웹사이트 제작',
        tags: ['HTML5', 'CSS3', 'JavaScript', '반응형 웹'],
        image: 'front/img/hycu-1.png'
    },
    {
        id: 1,
        title: 'URSCOPE 프로젝트',
        description: 'URSCOPE 기업 웹사이트 리뉴얼 및 개발',
        tags: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap'],
        image: 'front/img/urscope-1.png'
    },
    {
        id: 2,
        title: 'KMR(한국경영인증원) 프로젝트',
        description: '한국경영인증원 공식 웹사이트 제작',
        tags: ['HTML5', 'CSS3', 'JavaScript', 'jQuery'],
        image: 'front/img/kmr-1.png'
    },
    {
        id: 3,
        title: 'Corfa(연구관리혁신협의회) 프로젝트',
        description: '연구관리혁신협의회 웹사이트 제작',
        tags: ['HTML5', 'CSS3', 'JavaScript', '반응형 웹'],
        image: 'front/img/corfa1.jpg'
    },
    {
        id: 4,
        title: '랜딩페이지 제작 프로젝트',
        description: '포트폴리오용 랜딩페이지 제작',
        tags: ['HTML5', 'CSS3', 'JavaScript', 'GSAP'],
        image: 'front/img/landing1.jpg'
    },
    {
        id: 5,
        title: 'SmartPPT2024 프로젝트',
        description: 'SmartPPT2024 교육 콘텐츠 제작',
        tags: ['HTML5', 'CSS3', 'JavaScript', '교육 콘텐츠'],
        image: 'front/img/smartppt1.jpg'
    },
    {
        id: 6,
        title: 'AIDT 초등수학 프로젝트',
        description: '초등학생을 위한 수학 교육 콘텐츠 제작',
        tags: ['HTML5', 'CSS3', 'JavaScript', '교육 게임'],
        image: 'front/img/aidt1.jpg'
    },
    {
        id: 7,
        title: 'i-scream 전자저작물 프로젝트',
        description: 'i-scream 전자저작물 콘텐츠 제작',
        tags: ['HTML5', 'CSS3', 'JavaScript', '멀티미디어'],
        image: 'front/img/iscream1.jpg'
    },
    {
        id: 8,
        title: '능률 중등수학 프로젝트',
        description: '능률교육 중등수학 교재 콘텐츠 제작',
        tags: ['HTML5', 'CSS3', 'JavaScript', '교육 콘텐츠'],
        image: 'front/img/mmath1.jpg'
    }
];

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Initialize all components
        initLoadingAnimation();
        initFloatingNavigation();
        initProjects();
        initProjectButtonsScroll();
        initIpadScroll();
        initContactForm();
        
        // Initialize AOS if available
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 1000,
                easing: 'ease-out-cubic',
                once: true,
                offset: 100,
                delay: 100
            });
        }
        
        // Initialize GSAP if available
        if (typeof gsap !== 'undefined') {
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
        
        console.log('✅ Portfolio initialized successfully');
        
    } catch (error) {
        console.error('❌ Initialization error:', error);
    }
});

// Global error handling
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});