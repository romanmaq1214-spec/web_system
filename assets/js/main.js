// Mobile menu toggle and sidebar toggle
document.addEventListener('DOMContentLoaded', function() {
  // Mobile navbar toggle (for auth pages and small screens)
  const navToggle = document.createElement('div');
  navToggle.className = 'nav-toggle';
  navToggle.innerHTML = `
    <span></span>
    <span></span>
    <span></span>
  `;
  
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    navbar.insertBefore(navToggle, navbar.firstChild);
    
    const navMenu = document.querySelector('.nav-menu');
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      this.classList.toggle('active');
    });
  }
  
  // Sidebar toggle for mobile
  const sidebarToggle = document.createElement('button');
  sidebarToggle.className = 'sidebar-toggle';
  sidebarToggle.innerHTML = '<span class="hamburger"></span>';
  sidebarToggle.setAttribute('aria-label', 'Toggle sidebar');
  sidebarToggle.setAttribute('aria-expanded', 'false');
  
  const mainHeader = document.querySelector('.main-header');
  if (mainHeader) {
    mainHeader.appendChild(sidebarToggle);
    
    const sidebar = document.querySelector('.sidebar');
    sidebarToggle.addEventListener('click', function() {
      const isOpen = sidebar.classList.toggle('open');
      this.setAttribute('aria-expanded', isOpen);
      
      // Also toggle a class on body to prevent scrolling when sidebar is open
      document.body.classList.toggle('sidebar-open', isOpen);
    });
  }
  
  // Close sidebar when clicking outside on mobile
  document.addEventListener('click', function(e) {
    const sidebar = document.querySelector('.sidebar');
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    if (sidebar && sidebarToggle && !sidebar.contains(e.target) && !sidebarToggle.contains(e.target) && sidebar.classList.contains('open')) {
      sidebar.classList.remove('open');
      sidebarToggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('sidebar-open');
    }
  });
  
  // Add active class to nav links based on current page
  const currentLocation = location.href;
  const navLinks = document.querySelectorAll('.nav-link, .nav-item');
  navLinks.forEach(link => {
    if (link.href === currentLocation) {
      link.classList.add('active');
    }
  });
  
  // Form validation (basic)
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      // You can add custom validation here
      // For now, just prevent default for demo
      // e.preventDefault();
    });
  });
  
  // Close alerts
  const alertCloseBtns = document.querySelectorAll('.alert-close');
  alertCloseBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      this.parentElement.style.display = 'none';
    });
  });
  
  // Initialize tooltips (if any)
  const tooltipTriggers = document.querySelectorAll('[data-tooltip]');
  tooltipTriggers.forEach(trigger => {
    trigger.addEventListener('mouseenter', function() {
      const tooltipText = this.getAttribute('data-tooltip');
      const tooltip = document.createElement('div');
      tooltip.className = 'tooltip';
      tooltip.innerHTML = tooltipText;
      document.body.appendChild(tooltip);
      
      const rect = this.getBoundingClientRect();
      tooltip.style.left = `${rect.left + window.scrollX}px`;
      tooltip.style.top = `${rect.bottom + window.scrollY + 8}px`;
      
      this._tooltip = tooltip;
    });
    
    trigger.addEventListener('mouseleave', function() {
      if (this._tooltip) {
        this._tooltip.remove();
        this._tooltip = null;
      }
    });
  });
});
