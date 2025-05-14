// // Theme toggle functionality
// function initTheme() {
//     // Check for saved theme preference or use system preference
//     const savedTheme = localStorage.getItem('fakemondex-theme');
//     const systemPrefersdarkj = window.matchMedia('(prefers-color-scheme: darkj)').matches;
    
//     if (savedTheme === 'darkj' || (!savedTheme && systemPrefersdarkj)) {
//         document.documentElement.classList.add('darkj');
//     }
    
//     // Set up theme toggle button
//     const themeToggle = document.getElementById('theme-toggle');
//     themeToggle.addEventListener('click', () => {
//         document.documentElement.classList.toggle('darkj');
//         const isdarkj = document.documentElement.classList.contains('darkj');
//         localStorage.setItem('fakemondex-theme', isdarkj ? 'darkj' : 'light');
//     });
// }

// // Initialize when DOM is loaded
// document.addEventListener('DOMContentLoaded', initTheme);