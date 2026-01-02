// Dark Mode Toggle
(function() {
    const themeCheckbox = document.getElementById('theme-checkbox');
    const body = document.body;
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Apply saved theme on page load
    if (currentTheme === 'dark') {
      body.classList.add('dark-mode');
      if (themeCheckbox) {
        themeCheckbox.checked = true;
      }
    }
    
    // Theme toggle handler
    if (themeCheckbox) {
      themeCheckbox.addEventListener('change', function() {
        if (this.checked) {
          body.classList.add('dark-mode');
          localStorage.setItem('theme', 'dark');
        } else {
          body.classList.remove('dark-mode');
          localStorage.setItem('theme', 'light');
        }
      });
    }
  })();