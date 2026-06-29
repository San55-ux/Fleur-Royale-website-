import { formatDateLabel } from '../utils/calendar.js';

export function renderCart(containerId, cartState, onRemoveItem, onCloseCart, onCheckout) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const { items, booking } = cartState;

  // Calculate pricing
  const subtotal = items.reduce((acc, item) => acc + item.price, 0);
  const deliveryCharge = booking.slot ? booking.slot.charge : 0;
  const total = subtotal + deliveryCharge;

  container.innerHTML = `
    <div class="cart-header">
      <h2 class="cart-title">Your Bookings</h2>
      <button class="cart-close-btn" id="cart-close-trigger" aria-label="Close Cart">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>

    <!-- Items list -->
    <div class="cart-items-list">
      ${items.length === 0 
        ? `<p class="cart-empty-message">No arrangements selected yet.</p>` 
        : items.map((item, idx) => `
            <div class="cart-item-card">
              <img src="${item.image}" alt="${item.name}" class="cart-item-thumb">
              <div class="cart-item-details">
                <span class="cart-item-name">${item.name}</span>
                <span class="cart-item-meta">${item.selections.wrap} Wrap / ${item.selections.ribbon} Ribbon</span>
                <div class="cart-item-price-row">
                  <span class="cart-item-price">$${item.price}</span>
                  <button class="cart-item-remove" data-index="${idx}">Remove</button>
                </div>
              </div>
            </div>
          `).join('')
      }
    </div>

    <!-- Summary & Scheduling -->
    <div class="cart-summary-box">
      <div class="summary-row">
        <span>Delivery Schedule</span>
        <span style="font-weight: 500; text-align: right;">
          ${booking.date 
            ? `${formatDateLabel(booking.date)}` 
            : `<a href="#booking" style="color: var(--color-gold-dark); text-decoration: underline;" id="cart-schedule-lnk">Select Date</a>`
          }
        </span>
      </div>
      <div class="summary-row">
        <span>Window</span>
        <span style="font-weight: 500;">
          ${booking.slot ? booking.slot.title : 'Not chosen'}
        </span>
      </div>
      <div class="summary-row">
        <span>Arrangement Subtotal</span>
        <span>$${subtotal}</span>
      </div>
      <div class="summary-row">
        <span>Delivery Fee</span>
        <span>${deliveryCharge === 0 ? 'Complimentary' : `+$${deliveryCharge}`}</span>
      </div>
      <div class="summary-row total">
        <span>Total</span>
        <span>$${total}</span>
      </div>

      <button class="btn-primary btn-checkout" id="checkout-trigger-btn" ${items.length === 0 ? 'disabled style="opacity: 0.5; cursor: not-allowed;"' : ''}>
        Confirm & Book Arrangement
      </button>
    </div>
  `;

  // Attach Close Event
  const closeBtn = document.getElementById('cart-close-trigger');
  if (closeBtn) {
    closeBtn.addEventListener('click', onCloseCart);
  }

  // Attach Date Selector Link (closes cart and scrolls to calendar)
  const scheduleLnk = document.getElementById('cart-schedule-lnk');
  if (scheduleLnk) {
    scheduleLnk.addEventListener('click', () => {
      onCloseCart();
    });
  }

  // Attach Item Remove Listeners
  container.querySelectorAll('.cart-item-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-index'));
      onRemoveItem(idx);
    });
  });

  // Attach Checkout Listener
  const checkoutBtn = document.getElementById('checkout-trigger-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (!booking.date) {
        alert('Please select a delivery date on the scheduling calendar before booking.');
        onCloseCart();
        window.location.hash = '#booking';
        return;
      }
      if (!booking.slot) {
        alert('Please select a delivery window time slot before booking.');
        onCloseCart();
        window.location.hash = '#booking';
        return;
      }

      onCheckout(total);
    });
  }
}
