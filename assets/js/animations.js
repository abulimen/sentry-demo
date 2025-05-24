// Sentry Payment Platform - Animations JavaScript File

document.addEventListener('DOMContentLoaded', function() {
  // Initialize reveal on scroll animations
  initRevealAnimations();

  // Initialize Pi Network payment flow animations
  initPaymentFlowAnimation();

  // Initialize blockchain verification animations
  initBlockchainVerificationAnimation();
});

// Reveal elements on scroll
function initRevealAnimations() {
  const revealElements = document.querySelectorAll('.reveal');

  const revealOnScroll = function() {
    for (let i = 0; i < revealElements.length; i++) {
      const windowHeight = window.innerHeight;
      const elementTop = revealElements[i].getBoundingClientRect().top;
      const elementVisible = 150;

      if (elementTop < windowHeight - elementVisible) {
        revealElements[i].classList.add('active');
      }
    }
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Check on initial load
}

// Pi Network Payment Flow Animation
function initPaymentFlowAnimation() {
  const paymentDemo = document.getElementById('payment-flow-demo');

  if (paymentDemo) {
    const startButton = document.getElementById('start-payment-demo');
    const paymentSteps = document.querySelectorAll('.payment-step');
    const paymentLine = document.querySelector('.payment-flow-line');

    startButton.addEventListener('click', function() {
      // Reset state
      paymentSteps.forEach(step => step.classList.remove('active'));
      paymentLine.classList.remove('animate');

      // Animate first step immediately
      paymentSteps[0].classList.add('active');

      // Animate line
      setTimeout(() => {
        paymentLine.classList.add('animate');
      }, 500);

      // Animate subsequent steps with delays
      for (let i = 1; i < paymentSteps.length; i++) {
        setTimeout(() => {
          paymentSteps[i-1].classList.remove('active');
          paymentSteps[i].classList.add('active');
        }, 1000 * i);
      }

      // Show success message at the end
      setTimeout(() => {
        showNotification('Payment flow completed successfully!', 'success');
      }, 1000 * paymentSteps.length);
    });
  }
}

// Blockchain Verification Animation
function initBlockchainVerificationAnimation() {
  const blockchainDemo = document.getElementById('blockchain-verify-demo');

  if (blockchainDemo) {
    const startButton = document.getElementById('start-blockchain-demo');
    const blockchainNodes = document.querySelectorAll('.blockchain-node');
    const verificationStatus = document.querySelector('.verification-status');

    startButton.addEventListener('click', function() {
      // Reset state
      blockchainNodes.forEach(node => node.classList.remove('active'));
      verificationStatus.classList.remove('show');
      verificationStatus.textContent = 'Initiating verification...';
      verificationStatus.classList.add('show');

      // Animate nodes with delays
      for (let i = 0; i < blockchainNodes.length; i++) {
        setTimeout(() => {
          blockchainNodes[i].classList.add('active');

          if (i === 0) {
            verificationStatus.textContent = 'Submitting data to blockchain...';
          } else if (i === 1) {
            verificationStatus.textContent = 'Nodes validating information...';
          } else if (i === 2) {
            verificationStatus.textContent = 'Creating cryptographic proof...';
          } else if (i === blockchainNodes.length - 1) {
            verificationStatus.textContent = 'Verification complete! Data is now immutably stored on the blockchain.';

            // Generate fake hash
            const fakeHash = Array.from({ length: 32 }, () =>
              Math.floor(Math.random() * 16).toString(16)).join('');

            // Display hash after a short delay
            setTimeout(() => {
              const hashEl = document.createElement('div');
              hashEl.className = 'review-hash';
              hashEl.textContent = `Blockchain Hash: ${fakeHash}`;
              verificationStatus.appendChild(hashEl);
            }, 500);

            // Show completion notification
            showNotification('Blockchain verification completed!', 'success');
          }
        }, 800 * i);
      }
    });
  }
}

// Interactive dashboard demo
function initDashboardDemo() {
  const dashboardDemo = document.getElementById('dashboard-demo');

  if (dashboardDemo) {
    const tabs = dashboardDemo.querySelectorAll('.dashboard-tab');
    const panels = dashboardDemo.querySelectorAll('.dashboard-panel');

    tabs.forEach(tab => {
      tab.addEventListener('click', function() {
        const target = this.dataset.target;

        // Update active tab
        tabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');

        // Show target panel
        panels.forEach(panel => {
          if (panel.id === target) {
            panel.classList.add('active');
          } else {
            panel.classList.remove('active');
          }
        });
      });
    });

    // Simulate data loading
    const dataCharts = dashboardDemo.querySelectorAll('.data-chart');
    dataCharts.forEach(chart => {
      chart.classList.add('loading');

      setTimeout(() => {
        chart.classList.remove('loading');
      }, 1500);
    });
  }
}

// Create animated count-up effect
function createCountUp(element, target, duration = 2000, prefix = '', suffix = '') {
  const start = 0;
  const increment = Math.ceil(target / (duration / 16));
  let current = start;

  const updateCount = () => {
    current += increment;
    if (current > target) current = target;

    element.textContent = prefix + current.toLocaleString() + suffix;

    if (current < target) {
      requestAnimationFrame(updateCount);
    }
  };

  updateCount();
}

// Initialize count-up animations when elements are in viewport
function initCountUpAnimations() {
  const countUpElements = document.querySelectorAll('.count-up');

  const handleScroll = function() {
    countUpElements.forEach(element => {
      if (element.classList.contains('counted')) return;

      const position = element.getBoundingClientRect();

      // Check if element is in viewport
      if (position.top < window.innerHeight && position.bottom >= 0) {
        element.classList.add('counted');

        const target = parseInt(element.dataset.target, 10);
        const prefix = element.dataset.prefix || '';
        const suffix = element.dataset.suffix || '';

        createCountUp(element, target, 2000, prefix, suffix);
      }
    });
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Check on initial load
}

// Run on page load
initCountUpAnimations();
initDashboardDemo();
