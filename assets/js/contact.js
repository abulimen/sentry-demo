// Sentry Contact Form JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form-main'); // Assuming the form has an ID

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const fullNameInput = contactForm.querySelector('#full-name');
            const emailInput = contactForm.querySelector('#email');
            const subjectInput = contactForm.querySelector('#subject');
            const messageInput = contactForm.querySelector('#message');
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;

            // Basic validation
            if (!fullNameInput.value.trim() || !emailInput.value.trim() || !subjectInput.value.trim() || !messageInput.value.trim()) {
                showContactNotification('Please fill in all fields.', 'error', contactForm);
                return;
            }
            if (!isValidEmail(emailInput.value.trim())) { // Re-use or re-define isValidEmail
                showContactNotification('Please enter a valid email address.', 'error', contactForm);
                return;
            }

            submitButton.innerHTML = '<span class="loading-spinner"></span> Sending Message...';
            submitButton.disabled = true;

            setTimeout(() => {
                showContactNotification('Your message has been sent! We\'ll get back to you soon.', 'success', contactForm);
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
                contactForm.reset(); // Clear form fields
            }, 2000); // Simulate API delay
        });
    }
});

function isValidEmail(email) {
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Simple notification function for contact page
function showContactNotification(message, type = 'info', formElement) {
    let notification = formElement.querySelector('.contact-form-notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.className = 'contact-form-notification'; // Use a distinct class for styling
        // Insert notification before the submit button or at the end of the form
        const submitButton = formElement.querySelector('button[type="submit"]');
        if (submitButton) {
            formElement.insertBefore(notification, submitButton);
        } else {
            formElement.appendChild(notification); // Fallback
        }
    }
    
    // Apply general notification styles from styles.css and specific type
    notification.className = `notification notification-${type}`; 
    notification.textContent = message;
    

    // Make it visible
    notification.style.display = 'block'; // Ensure it's not display:none from CSS
    notification.style.opacity = '1'; // Trigger fade in if CSS transition exists

    // Auto-hide after some time
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
             notification.style.display = 'none'; // Hide after fade out
        }, 500); // Match CSS transition duration
    }, 3500);
}
