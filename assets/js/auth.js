// Sentry Authentication JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Login Form Simulation
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = loginForm.querySelector('#email');
            const passwordInput = loginForm.querySelector('#password');
            const submitButton = loginForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;

            // Basic validation
            if (!emailInput.value.trim() || !passwordInput.value.trim()) {
                showAuthNotification('Please enter both email and password.', 'error', loginForm);
                return;
            }
            if (!isValidEmail(emailInput.value.trim())) {
                showAuthNotification('Please enter a valid email address.', 'error', loginForm);
                return;
            }

            submitButton.innerHTML = '<span class="loading-spinner"></span> Logging in...';
            submitButton.disabled = true;

            setTimeout(() => {
                // Simulate successful login
                showAuthNotification('Login successful! Redirecting...', 'success', loginForm);
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1000); 
                // Keep button disabled during redirect
            }, 1500); // Simulate API delay
        });
    }

    // Signup Form Simulation
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const fullNameInput = signupForm.querySelector('#full-name');
            const emailInput = signupForm.querySelector('#email');
            const passwordInput = signupForm.querySelector('#password');
            const confirmPasswordInput = signupForm.querySelector('#confirm-password');
            const termsCheckbox = signupForm.querySelector('#terms');
            const submitButton = signupForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;

            // Basic validation
            if (!fullNameInput.value.trim() || !emailInput.value.trim() || !passwordInput.value.trim() || !confirmPasswordInput.value.trim()) {
                showAuthNotification('Please fill in all required fields.', 'error', signupForm);
                return;
            }
            if (!isValidEmail(emailInput.value.trim())) {
                showAuthNotification('Please enter a valid email address.', 'error', signupForm);
                return;
            }
            if (passwordInput.value.length < 8) {
                showAuthNotification('Password must be at least 8 characters long.', 'error', signupForm);
                return;
            }
            if (passwordInput.value !== confirmPasswordInput.value) {
                showAuthNotification('Passwords do not match.', 'error', signupForm);
                return;
            }
            if (!termsCheckbox.checked) {
                showAuthNotification('You must agree to the Terms of Service and Privacy Policy.', 'error', signupForm);
                return;
            }

            submitButton.innerHTML = '<span class="loading-spinner"></span> Creating account...';
            submitButton.disabled = true;

            setTimeout(() => {
                // Simulate successful signup
                showAuthNotification('Account created successfully! Redirecting to login...', 'success', signupForm);
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000); // Keep button disabled
            }, 1500); // Simulate API delay
        });
    }

    // Password visibility toggle (reusable for both forms)
    const passwordToggles = document.querySelectorAll('.password-toggle');
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const passwordInput = this.previousElementSibling; // Assumes button is immediately after input
            if (passwordInput && passwordInput.type === 'password') {
                passwordInput.type = 'text';
                this.classList.add('visible');
                this.setAttribute('aria-label', 'Hide password');
            } else if (passwordInput) {
                passwordInput.type = 'password';
                this.classList.remove('visible');
                this.setAttribute('aria-label', 'Show password');
            }
        });
    });
});

function isValidEmail(email) {
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Simple notification function for auth pages
function showAuthNotification(message, type = 'info', formElement) {
    let notification = formElement.querySelector('.auth-notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.className = 'auth-notification';
        // Insert notification before the first form group or submit button
        const firstFormGroup = formElement.querySelector('.form-group, button[type="submit"]');
        if (firstFormGroup) {
            formElement.insertBefore(notification, firstFormGroup);
        } else {
            formElement.appendChild(notification); // Fallback
        }
    }
    
    notification.textContent = message;
    notification.className = `auth-notification notification-${type}`; // Use general notification styles

    // Make it visible
    notification.style.display = 'block';
    notification.style.opacity = '1';

    // Optional: auto-hide after some time
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
             notification.style.display = 'none';
        }, 300);
    }, 3000);
}

// Password strength meter (from signup.html, slightly adapted)
const passwordInputForStrength = document.querySelector('#signup-form #password'); // Ensure it's scoped to signup
if (passwordInputForStrength) {
    const strengthMeter = document.querySelector('#signup-form .strength-meter');
    const strengthText = document.querySelector('#signup-form .strength-text');
    const strengthSegments = document.querySelectorAll('#signup-form .strength-segment');

    if (strengthMeter && strengthText && strengthSegments.length > 0) {
        passwordInputForStrength.addEventListener('input', function() {
            const password = this.value;
            let strength = 0;

            if (password.length >= 8) strength += 1;
            if (/[A-Z]/.test(password)) strength += 1;
            if (/[0-9]/.test(password)) strength += 1;
            if (/[^A-Za-z0-9\s]/.test(password)) strength += 1; // Corrected regex for special chars, excluding space

            strengthSegments.forEach((segment, index) => {
                segment.classList.toggle('active', index < strength);
            });

            const strengthClasses = ['weak', 'fair', 'good', 'strong'];
            strengthText.className = 'strength-text'; // Reset classes

            if (password.length === 0) {
                strengthText.textContent = 'Password strength';
            } else if (strength <= 1) {
                strengthText.textContent = 'Weak';
                strengthText.classList.add('weak');
            } else if (strength === 2) {
                strengthText.textContent = 'Fair';
                strengthText.classList.add('fair');
            } else if (strength === 3) {
                strengthText.textContent = 'Good';
                strengthText.classList.add('good');
            } else {
                strengthText.textContent = 'Strong';
                strengthText.classList.add('strong');
            }
        });
    }
}
