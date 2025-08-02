// Load components when page loads
document.addEventListener(‘DOMContentLoaded’, function() {
loadComponent(‘includes/nav.html’, ‘navigation-placeholder’);
loadComponent(‘includes/hero.html’, ‘hero-placeholder’);
loadComponent(‘includes/footer.html’, ‘footer-placeholder’);
});

// Function to load HTML components
function loadComponent(url, placeholderId) {
fetch(url)
.then(response => {
if (!response.ok) {
throw new Error(`HTTP error! status: ${response.status}`);
}
return response.text();
})
.then(html => {
const placeholder = document.getElementById(placeholderId);
if (placeholder) {
placeholder.innerHTML = html;
}
})
.catch(error => {
console.error(‘Error loading component:’, error);
// Fallback content if component fails to load
const placeholder = document.getElementById(placeholderId);
if (placeholder && placeholderId === ‘navigation-placeholder’) {
placeholder.innerHTML = `<header> <nav class="nav-links"> <a href="#home">Home</a> <a href="#services">Services</a> <a href="#about">About</a> <a href="#contact">Contact</a> </nav> </header>`;
}
});
}

// Form validation and enhancement
document.addEventListener(‘DOMContentLoaded’, function() {
const form = document.getElementById(‘quoteForm’);
if (form) {
form.addEventListener(‘submit’, function(e) {
// Basic form validation
const requiredFields = form.querySelectorAll(’[required]’);
let hasErrors = false;

```
        requiredFields.forEach(field => {
            const errorDiv = field.nextElementSibling;
            if (!field.value.trim()) {
                if (errorDiv && errorDiv.classList.contains('error-message')) {
                    errorDiv.style.display = 'block';
                }
                hasErrors = true;
            } else {
                if (errorDiv && errorDiv.classList.contains('error-message')) {
                    errorDiv.style.display = 'none';
                }
            }
        });

        // Email validation
        const emailField = document.getElementById('email');
        if (emailField && emailField.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const emailError = emailField.nextElementSibling;
            if (!emailRegex.test(emailField.value)) {
                if (emailError && emailError.classList.contains('error-message')) {
                    emailError.style.display = 'block';
                    emailError.textContent = 'Please enter a valid email address.';
                }
                hasErrors = true;
            } else {
                if (emailError && emailError.classList.contains('error-message')) {
                    emailError.style.display = 'none';
                }
            }
        }

        if (hasErrors) {
            e.preventDefault();
            return false;
        }
    });
}
```

});

// Smooth scrolling for navigation links
document.addEventListener(‘DOMContentLoaded’, function() {
// Use event delegation since nav is loaded dynamically
document.body.addEventListener(‘click’, function(e) {
if (e.target.matches(’.nav-links a[href^=”#”]’)) {
e.preventDefault();
const targetId = e.target.getAttribute(‘href’).substring(1);
const targetElement = document.getElementById(targetId);
if (targetElement) {
targetElement.scrollIntoView({
behavior: ‘smooth’,
block: ‘start’
});
}
}
});
});

// Enhanced form submission handling
function handleFormSuccess() {
const successMessage = document.getElementById(‘success-message’);
if (successMessage) {
successMessage.style.display = ‘block’;

```
    // Scroll to success message
    successMessage.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
    
    // Reset form after showing success
    const form = document.getElementById('quoteForm');
    if (form) {
        setTimeout(() => {
            form.reset();
        }, 1000);
    }
}
```

}

// Add loading state to CTA buttons
document.addEventListener(‘DOMContentLoaded’, function() {
const ctaButtons = document.querySelectorAll(’.cta-button’);
ctaButtons.forEach(button => {
button.addEventListener(‘click’, function() {
// Add subtle loading effect
this.style.transform = ‘scale(0.95)’;
setTimeout(() => {
this.style.transform = ‘’;
}, 150);
});
});
});
