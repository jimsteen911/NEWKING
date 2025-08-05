// Load components when page loads
document.addEventListener('DOMContentLoaded', function() {
  // Modular includes
  loadComponent('includes/nav.html', 'navigation-placeholder');
  loadComponent('includes/hero.html', 'hero-placeholder');
  loadComponent('includes/footer.html', 'footer-placeholder');

  // Smooth scrolling for in-page links
  document.body.addEventListener('click', function(e) {
    if (e.target.matches('.nav-links a[href^="#"]')) {
      e.preventDefault();
      const targetId = e.target.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });

  // Form validation
  const form = document.getElementById('quoteForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      let hasErrors = false;
      const requiredFields = form.querySelectorAll('[required]');

      requiredFields.forEach(field => {
        const errorDiv = field.nextElementSibling;
        if (!field.value.trim()) {
          if (errorDiv?.classList.contains('error-message')) {
            errorDiv.style.display = 'block';
          }
          hasErrors = true;
        } else {
          if (errorDiv?.classList.contains('error-message')) {
            errorDiv.style.display = 'none';
          }
        }
      });

      const emailField = document.getElementById('email');
      if (emailField?.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const emailError = emailField.nextElementSibling;
        if (!emailRegex.test(emailField.value)) {
          if (emailError?.classList.contains('error-message')) {
            emailError.style.display = 'block';
            emailError.textContent = 'Please enter a valid email address.';
          }
          hasErrors = true;
        } else {
          if (emailError?.classList.contains('error-message')) {
            emailError.style.display = 'none';
          }
        }
      }

      if (hasErrors) {
        e.preventDefault();
      }
    });
  }

  // CTA button press animation
  document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', function() {
      this.style.transform = 'scale(0.95)';
      setTimeout(() => this.style.transform = '', 150);
    });
  });
});

// Load HTML components dynamically into placeholders
function loadComponent(url, placeholderId) {
  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return response.text();
    })
    .then(html => {
      const placeholder = document.getElementById(placeholderId);
      if (placeholder) placeholder.innerHTML = html;
    })
    .catch(error => {
      console.error('Error loading component:', error);
      const placeholder = document.getElementById(placeholderId);
      if (placeholder && placeholderId === 'navigation-placeholder') {
        placeholder.innerHTML = `<header><nav class="nav-links">
          <a href="#home">Home</a>
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav></header>`;
      }
    });
}

// Optional: Trigger success message if needed (used externally)
function handleFormSuccess() {
  const successMessage = document.getElementById('success-message');
  if (successMessage) {
    successMessage.style.display = 'block';
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

    const form = document.getElementById('quoteForm');
    if (form) {
      setTimeout(() => form.reset(), 1000);
    }
  }
}
