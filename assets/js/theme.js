/**
 * Shared Theme Management
 * Handles dark/light mode switching with localStorage persistence
 */

(function() {
    'use strict';
    
    const THEME_KEY = 'portfolio-theme';
    const THEME_LIGHT = 'light';
    const THEME_DARK = 'dark';
    
    /**
     * Initialize theme on page load
     */
    function initTheme() {
        const savedTheme = localStorage.getItem(THEME_KEY) || THEME_DARK;
        applyTheme(savedTheme);
        updateThemeButton(savedTheme);
    }
    
    /**
     * Apply theme to document
     */
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(THEME_KEY, theme);
    }
    
    /**
     * Update theme toggle button icon
     */
    function updateThemeButton(theme) {
        const themeBtn = document.getElementById('theme-btn');
        if (themeBtn) {
            themeBtn.textContent = theme === THEME_LIGHT ? '🌙' : '☀️';
            themeBtn.setAttribute('aria-label', 
                theme === THEME_LIGHT ? 'Switch to dark mode' : 'Switch to light mode'
            );
        }
    }
    
    /**
     * Toggle between light and dark themes
     */
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || THEME_DARK;
        const newTheme = currentTheme === THEME_LIGHT ? THEME_DARK : THEME_LIGHT;
        applyTheme(newTheme);
        updateThemeButton(newTheme);
    }
    
    // Initialize theme immediately
    initTheme();
    
    // Expose toggle function globally
    window.toggleTheme = toggleTheme;
    
    // Set up event listener when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            const themeBtn = document.getElementById('theme-btn');
            if (themeBtn) {
                themeBtn.addEventListener('click', toggleTheme);
            }
        });
    } else {
        const themeBtn = document.getElementById('theme-btn');
        if (themeBtn) {
            themeBtn.addEventListener('click', toggleTheme);
        }
    }
})();
