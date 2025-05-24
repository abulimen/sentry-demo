// Sentry Payment Platform - Dashboard JavaScript File

document.addEventListener('DOMContentLoaded', function() {
  // Initialize dashboard tabs
  initDashboardTabs();

  // Initialize star rating
  initStarRating();

  // Animate charts on load
  setTimeout(() => {
    const charts = document.querySelectorAll('.data-chart');
    charts.forEach(chart => {
      chart.classList.remove('loading');
    });
  }, 800);
});

// Dashboard Tabs Functionality
function initDashboardTabs() {
  const tabButtons = document.querySelectorAll('.dashboard-tab');
  const panels = document.querySelectorAll('.dashboard-panel');

  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Get target panel id
      const targetId = this.dataset.target;

      // Remove active class from all buttons and panels
      tabButtons.forEach(btn => btn.classList.remove('active'));
      panels.forEach(panel => panel.classList.remove('active'));

      // Add active class to clicked button and corresponding panel
      this.classList.add('active');
      document.getElementById(targetId).classList.add('active');
    });
  });
}

// Star Rating Functionality
function initStarRating() {
  const stars = document.querySelectorAll('.star');
  const ratingInput = document.getElementById('review-rating');

  stars.forEach(star => {
    star.addEventListener('click', function() {
      const value = parseInt(this.dataset.value);

      // Update hidden input value
      ratingInput.value = value;

      // Update star display
      stars.forEach(s => {
        const starValue = parseInt(s.dataset.value);
        if (starValue <= value) {
          s.classList.add('active');
        } else {
          s.classList.remove('active');
        }
      });
    });
  });
}

// Format numbers with commas
function formatNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Demo functions for dashboard interactions
function generateRandomData(min, max, count) {
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return data;
}

function updateCharts() {
  // This would be replaced with real data fetching in a production environment
  const dailySalesData = generateRandomData(50, 200, 7);
  const reviewDistributionData = [68, 24, 8]; // 5-star, 4-star, 3-star and below

  // Here we'd update the charts with the new data
  // For demo purposes, we're just showing placeholders
  showNotification('Charts updated with latest data', 'info');
}

// Create new transaction row
function createTransaction(orderId, products, amount, status) {
  const transactionList = document.querySelector('.transaction-list');

  const statusClass = status === 'Completed' ? 'success' :
                      status === 'Pending' ? 'pending' : 'failed';

  const transactionItem = document.createElement('div');
  transactionItem.className = 'transaction-item';
  transactionItem.innerHTML = `
    <div class="transaction-info">
      <h4>Order #${orderId}</h4>
      <p>${products}</p>
    </div>
    <div class="transaction-details">
      <span class="transaction-amount">π${amount}</span>
      <span class="transaction-status ${statusClass}">${status}</span>
    </div>
  `;

  // Add to the beginning of the list
  transactionList.prepend(transactionItem);

  // Remove the last item if more than 5
  if (transactionList.children.length > 5) {
    transactionList.removeChild(transactionList.lastChild);
  }

  // Animate the new item
  setTimeout(() => {
    transactionItem.style.backgroundColor = 'rgba(58, 85, 242, 0.05)';
    setTimeout(() => {
      transactionItem.style.backgroundColor = '';
      transactionItem.style.transition = 'background-color 0.5s ease';
    }, 500);
  }, 100);
}

// Simulate new transaction coming in every 30 seconds for demo
setInterval(() => {
  const orderId = Math.floor(38292 + Math.random() * 100);
  const products = ['Product A', 'Product B', 'Product C', 'Product D'];
  const selectedProducts = products
    .filter(() => Math.random() > 0.5)
    .slice(0, Math.floor(Math.random() * 3) + 1)
    .join(', ');
  const amount = (Math.random() * 200 + 20).toFixed(2);
  const statuses = ['Completed', 'Completed', 'Completed', 'Pending', 'Failed'];
  const status = statuses[Math.floor(Math.random() * statuses.length)];

  createTransaction(orderId, selectedProducts || products[0], amount, status);
}, 30000);

// Export some functions for other modules
window.dashboardFunctions = {
  updateCharts,
  createTransaction
};
