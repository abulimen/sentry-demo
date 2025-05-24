// Sentry Payment Platform - Dashboard JavaScript File

document.addEventListener('DOMContentLoaded', function() {
  // Initialize dashboard tabs
  initDashboardTabs();

  // Initialize star rating
  initStarRating();

  // Animate Quick Stats
  animateStats();

  // Update Payment Activity Chart
  updatePaymentActivityChart(); // This was added in the previous successful diff.

  // Update Reports Line Chart
  updateReportsLineChart();

  // Update Top Products Chart
  updateTopProductsChart();

  // Animate charts on load
  setTimeout(() => {
    const charts = document.querySelectorAll('.data-chart');
    charts.forEach(chart => {
      chart.classList.remove('loading');
    });
  }, 800);
});

// Animate Stats on Load
function animateStats() {
  const countUpElements = document.querySelectorAll('.count-up');
  countUpElements.forEach(el => {
    const target = +el.dataset.target;
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const duration = 1500; // Animation duration in ms
    const frameDuration = 1000 / 60; // 60 FPS
    const totalFrames = Math.round(duration / frameDuration);
    let frame = 0;

    const count = () => {
      frame++;
      const progress = frame / totalFrames;
      const currentVal = Math.round(target * progress);

      if (frame === totalFrames) {
        el.textContent = prefix + formatNumber(target) + suffix; // Use formatNumber for final value
      } else {
        el.textContent = prefix + formatNumber(currentVal) + suffix;
        requestAnimationFrame(count);
      }
    };
    requestAnimationFrame(count);
  });
}


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

// Update Top Products Chart
function updateTopProductsChart() {
    const productItems = document.querySelectorAll('.product-list .product-item');
    if (!productItems.length) return;

    // Example data: product name (must match h4), sales count, and max sales for percentage calculation
    const productData = [
        { name: "Product A", sales: 342 },
        { name: "Product B", sales: 256 },
        { name: "Product C", sales: 189 },
        { name: "Product D", sales: 127 }
    ];
    const maxSales = Math.max(...productData.map(p => p.sales));

    productItems.forEach(item => {
        const productNameElement = item.querySelector('.product-info h4');
        const salesTextElement = item.querySelector('.product-info p');
        const percentageBar = item.querySelector('.product-percentage');

        if (productNameElement && salesTextElement && percentageBar) {
            const productName = productNameElement.textContent.trim();
            const product = productData.find(p => p.name === productName);

            if (product) {
                salesTextElement.textContent = `${formatNumber(product.sales)} sales`;
                const percentageWidth = (product.sales / maxSales) * 100;
                percentageBar.style.width = `${percentageWidth}%`;
                percentageBar.title = `${product.sales} sales (${percentageWidth.toFixed(1)}%)`;
            }
        }
    });
}

// Update Reports Line Chart
function updateReportsLineChart() {
    const dotsContainer = document.querySelector('.reports-container .chart-dots');
    if (!dotsContainer) return;

    const dots = dotsContainer.querySelectorAll('.chart-dot');
    const reportData = [20, 40, 60, 45, 70, 80, 65]; // Example data for 7 dots
    const maxDataValue = 100; // Assuming data is a percentage or a value out of 100

    dots.forEach((dot, index) => {
        if (reportData[index] !== undefined) {
            const bottomPercentage = (reportData[index] / maxDataValue) * 100;
            // Adjust so dot's center is at the data point, considering dot height (e.g., 12px)
            // This requires knowing the dot's height and the container's height for precise centering.
            // For simplicity, this example positions the bottom of the dot.
            // A more accurate visual would involve `calc(${bottomPercentage}% - 6px)` if dot height is 12px.
            const effectiveBottom = Math.min(bottomPercentage, 95); // Cap at 95% to prevent overflow with dot height
            dot.style.bottom = `${effectiveBottom}%`;
            dot.setAttribute('data-value', `${reportData[index]}%`);
            dot.title = `Value: ${reportData[index]}%`;
        } else {
            dot.style.bottom = '0%';
        }
    });
    // The .chart-line itself is animated via CSS.
    // For a true dynamic line connecting these dots, SVG path manipulation or a charting library would be needed.
}

// Update Payment Activity Chart (Bar Chart)
function updatePaymentActivityChart() {
    const chartBarsContainer = document.querySelector('.chart-bars');
    if (!chartBarsContainer) return;

    // Clear existing bars if any (though current HTML is static)
    // chartBarsContainer.innerHTML = ''; // Uncomment if bars are dynamically added initially

    const bars = chartBarsContainer.querySelectorAll('.chart-bar');
    const paymentData = [120, 190, 150, 220, 180, 250, 210]; // Example data for 7 bars
    const maxDataValue = Math.max(...paymentData);

    bars.forEach((bar, index) => {
        if (paymentData[index] !== undefined) {
            const barHeightPercentage = (paymentData[index] / maxDataValue) * 100;
            bar.style.height = `${barHeightPercentage}%`;
            // Optional: Add data-value for tooltip
            bar.setAttribute('data-value', `π${formatNumber(paymentData[index])}`);
            bar.title = `Activity: π${formatNumber(paymentData[index])}`; // Simple browser tooltip
        } else {
            bar.style.height = '0%'; // Handle cases where there's less data than bars
        }
    });
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
