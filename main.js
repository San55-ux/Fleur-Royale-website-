import { renderCatalog, renderSingleStems } from './src/components/Catalog.js';
import { renderBooking } from './src/components/Booking.js';
import { renderCardWriter } from './src/components/CardWriter.js';
import { renderCart } from './src/components/Cart.js';
import { formatDateLabel } from './src/utils/calendar.js';

// Global application state
const cartState = {
  items: [],
  booking: {
    date: null,
    slot: null
  },
  card: {
    style: 'emerald',
    message: ''
  }
};

// Toggle Cart Overlay Drawer
const cartOverlay = document.getElementById('cart-overlay');
const cartBtn = document.getElementById('cart-btn');
const cartCounter = document.getElementById('cart-counter');

function toggleCart(isOpen) {
  if (isOpen) {
    cartOverlay.classList.add('active');
    cartOverlay.setAttribute('aria-hidden', 'false');
    // Refresh cart drawer rendering
    renderCartDrawer();
  } else {
    cartOverlay.classList.remove('active');
    cartOverlay.setAttribute('aria-hidden', 'true');
  }
}

// State modifiers
function addItemToCart(item) {
  cartState.items.push(item);
  updateCartCounter();
  toggleCart(true);
}

function removeItemFromCart(index) {
  cartState.items.splice(index, 1);
  updateCartCounter();
  renderCartDrawer();
}

function updateBookingState(bookingData) {
  cartState.booking.date = bookingData.date;
  cartState.booking.slot = bookingData.slot;
  renderCartDrawer();
}

function updateCardState(cardData) {
  cartState.card.style = cardData.style;
  cartState.card.message = cardData.message;
}

function updateCartCounter() {
  if (cartCounter) {
    cartCounter.innerText = cartState.items.length;
  }
}

// Render Cart Component
function renderCartDrawer() {
  renderCart(
    'cart-drawer-container',
    cartState,
    removeItemFromCart,
    () => toggleCart(false),
    confirmCheckout
  );
}

// Checkout Confirmation
function confirmCheckout(totalPrice) {
  const deliveryDateFormatted = formatDateLabel(cartState.booking.date);
  const slotTitle = cartState.booking.slot.title;
  
  // Format bouquet list for confirmation prompt
  const bouquetNames = cartState.items.map(b => `- ${b.name} (${b.selections.wrap} Wrap)`).join('\n');

  const message = `
========================================
       FLEUR ROYALE BOOKING CONFIRMED  
========================================

Thank you for choosing Fleur Royale. Your booking has been registered successfully.

Delivery Details:
----------------------------------------
Date: ${deliveryDateFormatted}
Window: ${slotTitle}

Arrangements:
${bouquetNames}

Custom Note:
"${cartState.card.message || 'None'}"

Total Charged: $${totalPrice}
----------------------------------------
A courier will hand-deliver your fresh flowers.
  `;

  alert(message);

  // Clear state on success
  cartState.items = [];
  cartState.booking.date = null;
  cartState.booking.slot = null;
  cartState.card.message = '';
  
  // Reset index form input
  const textInput = document.getElementById('card-text-input');
  const charCount = document.getElementById('card-char-count');
  if (textInput) textInput.value = '';
  if (charCount) charCount.innerText = '0';

  updateCartCounter();
  toggleCart(false);

  // Reload booking calendar to remove selected indicators
  renderBooking('calendar-widget-container', 'time-slots-container', updateBookingState);
}

// Bootstrap Website
function bootstrapSite() {
  // 1. Render Catalog
  renderCatalog('catalog-filters-container', 'catalog-grid-container', addItemToCart);

  // 1b. Render Custom Single Stems Selector
  renderSingleStems('stems-grid-container', addItemToCart);

  // 2. Render Calendar Booking slots
  renderBooking('calendar-widget-container', 'time-slots-container', updateBookingState);

  // 3. Render Card Writer
  renderCardWriter('card-preview-widget', updateCardState);

  // 4. Render Cart drawer initially (hidden)
  renderCartDrawer();

  // Attach Header Scroll Effect (adds shade shadow when scrolled)
  const header = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Attach Cart Header trigger
  if (cartBtn) {
    cartBtn.addEventListener('click', () => toggleCart(true));
  }

  // Click outside drawer closes it
  if (cartOverlay) {
    cartOverlay.addEventListener('click', (e) => {
      if (e.target === cartOverlay) {
        toggleCart(false);
      }
    });
  }
}

window.addEventListener('DOMContentLoaded', bootstrapSite);
