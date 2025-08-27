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
