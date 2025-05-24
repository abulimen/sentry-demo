// Sentry Payment Platform - Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
  // Initialize mobile menu functionality
  initMobileMenu();

  // Initialize tabs functionality
  initTabs();

  // Add scroll event listener for header
  initScrollHeader();

  // Simulate loading states for buttons
  initButtonLoadingStates();
});

// Mobile Menu Functionality
function initMobileMenu() {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const dropdowns = document.querySelectorAll('.dropdown');

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      navMenu.classList.toggle('active');

      // Toggle hamburger to X
      const bars = this.querySelectorAll('.bar');
      if (this.classList.contains('active')) {
        bars[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
      } else {
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
      }
    });
  }

  // Handle mobile dropdowns
  dropdowns.forEach(dropdown => {
    const link = dropdown.querySelector('.nav-link');

    if (window.innerWidth <= 768) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        dropdown.classList.toggle('active');
      });
    }
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target) && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      mobileMenuToggle.classList.remove('active');

      const bars = mobileMenuToggle.querySelectorAll('.bar');
      bars[0].style.transform = 'none';
      bars[1].style.opacity = '1';
      bars[2].style.transform = 'none';
    }
  });
}

// Tabs Functionality
function initTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const tabId = this.dataset.tab;

      // Remove active class from all buttons and contents
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));

      // Add active class to clicked button and corresponding content
      this.classList.add('active');
      document.getElementById(tabId).classList.add('active');
    });
  });
}

// Header Scroll Effect
function initScrollHeader() {
  const header = document.querySelector('.header');

  window.addEventListener('scroll', function() {
    if (window.scrollY > 10) {
      header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.boxShadow = 'none';
    }
  });
}

// Simulate Loading States for Buttons
function initButtonLoadingStates() {
  const buttons = document.querySelectorAll('.btn');

  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      if (this.classList.contains('btn-primary') || this.classList.contains('btn-secondary') || this.classList.contains('btn-outline')) {
        // Only for demo/prototype, prevent actual navigation
        // Exclude auth form submit buttons as they have their own logic
        if (this.closest('form.auth-form') || this.closest('form.contact-form-placeholder')) {
            return;
        }

        if (this.getAttribute('href') && !this.getAttribute('href').startsWith('#')) {
          e.preventDefault();

          const originalText = this.textContent;
          this.innerHTML = '<span class="loading-spinner"></span> Loading...';
          this.style.opacity = '0.8';
          this.style.pointerEvents = 'none';

          // Simulate API call or loading time
          setTimeout(() => {
            this.innerHTML = originalText;
            this.style.opacity = '1';
            this.style.pointerEvents = 'auto';

            // For demo purposes, show a simulated success message
            if (this.textContent.toLowerCase().includes('account') ||
                this.textContent.toLowerCase().includes('sign') ||
                this.textContent.toLowerCase().includes('contact')) {
              showNotification('Success! This is a demo prototype.');
            }
          }, 1500);
        }
      }
    });
  });
}

// Notification System
function showNotification(message, type = 'success') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  // Add to DOM
  document.body.appendChild(notification);

  // Trigger animation
  setTimeout(() => notification.classList.add('show'), 10);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Pi Network Payment Simulation
function simulatePiPayment(amount) {
  return new Promise((resolve) => {
    showNotification('Initiating Pi Network payment...', 'info');

    setTimeout(() => {
      showNotification(`Processing payment of ${amount} Pi...`, 'info');

      setTimeout(() => {
        // Simulate 90% success rate
        if (Math.random() < 0.9) {
          showNotification('Payment successful!', 'success');
          resolve({ success: true, txid: 'pi' + Math.random().toString(36).substring(2, 15) });
        } else {
          showNotification('Payment failed. Please try again.', 'error');
          resolve({ success: false });
        }
      }, 2000);
    }, 1500);
  });
}

// Blockchain Review Verification Simulation
function simulateReviewVerification(reviewText) {
  return new Promise((resolve) => {
    showNotification('Verifying review on blockchain...', 'info');

    setTimeout(() => {
      showNotification('Creating cryptographic signature...', 'info');

      setTimeout(() => {
        const fakeHash = Array.from({ length: 32 }, () =>
          Math.floor(Math.random() * 16).toString(16)).join('');

        showNotification('Review verified and stored on blockchain!', 'success');
        resolve({
          success: true,
          hash: fakeHash,
          timestamp: new Date().toISOString()
        });
      }, 2000);
    }, 1500);
  });
}

// Demo Payment Form Submission
const paymentForm = document.getElementById('payment-demo-form');
if (paymentForm) {
  paymentForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const amount = document.getElementById('payment-amount').value;

    // Display loading state
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.innerHTML = '<span class="loading-spinner"></span> Processing...';
    submitButton.disabled = true;

    try {
      // Simulate Pi Network payment
      const result = await simulatePiPayment(amount);

      if (result.success) {
        // Update UI for success
        document.getElementById('payment-result').innerHTML = `
          <div class="success-message">
            <div class="checkmark-circle">
              <div class="checkmark"></div>
            </div>
            <h3>Payment Successful!</h3>
            <p>Transaction ID: ${result.txid}</p>
            <p>Amount: ${amount} Pi</p>
            <p>Date: ${new Date().toLocaleString()}</p>
          </div>
        `;
      } else {
        // Update UI for failure
        document.getElementById('payment-result').innerHTML = `
          <div class="error-message">
            <div class="error-circle">
              <div class="error-x"></div>
            </div>
            <h3>Payment Failed</h3>
            <p>Please try again or contact support.</p>
          </div>
        `;
      }
    } catch (error) {
      console.error('Payment error:', error);
      document.getElementById('payment-result').innerHTML = `
        <div class="error-message">
          <h3>An error occurred</h3>
          <p>Please try again later.</p>
        </div>
      `;
    } finally {
      // Reset button state
      submitButton.innerHTML = originalText;
      submitButton.disabled = false;
    }
  });
}

// Demo Review Form Submission
const reviewForm = document.getElementById('review-demo-form');
if (reviewForm) {
  reviewForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const reviewText = document.getElementById('review-text').value;

    // Display loading state
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.innerHTML = '<span class="loading-spinner"></span> Verifying...';
    submitButton.disabled = true;

    try {
      // Simulate blockchain verification
      const result = await simulateReviewVerification(reviewText);

      if (result.success) {
        // Update UI for success
        document.getElementById('review-result').innerHTML = `
          <div class="success-message">
            <div class="checkmark-circle">
              <div class="checkmark"></div>
            </div>
            <h3>Review Verified!</h3>
            <p>Your review has been cryptographically signed and stored on the blockchain.</p>
            <p class="review-hash">Blockchain Hash: ${result.hash.substring(0, 8)}...${result.hash.substring(24)}</p>
            <p>Timestamp: ${new Date(result.timestamp).toLocaleString()}</p>
          </div>
        `;
      }
    } catch (error) {
      console.error('Review verification error:', error);
      document.getElementById('review-result').innerHTML = `
        <div class="error-message">
          <h3>Verification failed</h3>
          <p>Please try again later.</p>
        </div>
      `;
    } finally {
      // Reset button state
      submitButton.innerHTML = originalText;
      submitButton.disabled = false;
    }
  });
}
