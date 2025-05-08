// Theme toggle functionality
function initTheme() {
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('fakemondex-theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        document.documentElement.classList.add('dark');
    }
    
    // Set up theme toggle button
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        const isDark = document.documentElement.classList.contains('dark');
        localStorage.setItem('fakemondex-theme', isDark ? 'dark' : 'light');
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initTheme);