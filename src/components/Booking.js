import { generateCalendarDays, MONTH_NAMES, formatDateLabel } from '../utils/calendar.js';

export function renderBooking(containerId, slotsContainerId, onBookingUpdate) {
  const container = document.getElementById(containerId);
  const slotsContainer = document.getElementById(slotsContainerId);
  if (!container || !slotsContainer) return;

  // Local state
  let currentDate = new Date();
  let selectedDate = null;
  let selectedSlot = null;

  const timeSlots = [
    { id: 'morning', title: 'Morning Hand-Delivery', time: '08:00 AM - 12:00 PM', charge: 0 },
    { id: 'afternoon', title: 'Afternoon Hand-Delivery', time: '12:00 PM - 05:00 PM', charge: 0 },
    { id: 'sunset', title: 'Sunset Royal Express', time: '05:00 PM - 08:00 PM', charge: 15 }
  ];

  function handleDateClick(day) {
    if (day.isDisabled || day.isPadding) return;
    
    selectedDate = day.date;
    renderCalendar();
    notifyUpdate();
  }

  function handleSlotClick(slot) {
    selectedSlot = slot;
    renderSlots();
    notifyUpdate();
  }

  function notifyUpdate() {
    onBookingUpdate({
      date: selectedDate,
      slot: selectedSlot
    });
    
    // Update summary text below
    renderSummary();
  }

  function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const days = generateCalendarDays(year, month);

    container.innerHTML = `
      <div class="calendar-header">
        <h3 class="calendar-month-title">${MONTH_NAMES[month]} ${year}</h3>
        <div style="display: flex; gap: 0.5rem;">
          <button class="cal-nav-btn" id="cal-prev" aria-label="Previous Month">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button class="cal-nav-btn" id="cal-next" aria-label="Next Month">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>

      <div class="calendar-weekdays">
        <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
      </div>

      <div class="calendar-days-grid" id="calendar-days-container"></div>
    `;

    const daysGrid = document.getElementById('calendar-days-container');
    days.forEach(day => {
      const cell = document.createElement('div');
      cell.className = 'cal-day-cell';
      
      if (day.isPadding) {
        cell.classList.add('padding');
      } else {
        cell.innerText = day.dayNumber;
        
        if (day.isToday) cell.classList.add('today');
        if (day.isDisabled) {
          cell.classList.add('disabled');
        } else {
          // Check if selected
          if (selectedDate && day.date.getTime() === selectedDate.getTime()) {
            cell.classList.add('selected');
          }
          cell.addEventListener('click', () => handleDateClick(day));
        }
      }
      daysGrid.appendChild(cell);
    });

    // Attach Month Navigation
    const prevBtn = document.getElementById('cal-prev');
    const nextBtn = document.getElementById('cal-next');

    prevBtn.addEventListener('click', () => {
      // Don't navigate to past months
      const minDate = new Date();
      if (currentDate.getFullYear() > minDate.getFullYear() || currentDate.getMonth() > minDate.getMonth()) {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
      }
    });

    nextBtn.addEventListener('click', () => {
      currentDate.setMonth(currentDate.getMonth() + 1);
      renderCalendar();
    });
  }

  function renderSlots() {
    slotsContainer.innerHTML = `
      <h3 class="panel-subtitle">Select Time Window</h3>
      <p class="panel-desc">All bouquets are packed in temp-controlled courier cases for direct transit.</p>
      
      <div class="slots-grid">
        ${timeSlots.map(slot => {
          const isSelected = selectedSlot && selectedSlot.id === slot.id;
          return `
            <div class="slot-item ${isSelected ? 'selected' : ''}" data-id="${slot.id}">
              <div class="slot-meta">
                <span class="slot-title">${slot.title}</span>
                <span class="slot-time">${slot.time}</span>
              </div>
              <span class="slot-charge">${slot.charge === 0 ? 'Complimentary' : `+$${slot.charge}`}</span>
            </div>
          `;
        }).join('')}
      </div>

      <div class="selected-booking-summary" id="booking-summary-text">
        Please select a delivery date and time slot above.
      </div>
    `;

    // Attach slot click listeners
    slotsContainer.querySelectorAll('.slot-item').forEach(item => {
      item.addEventListener('click', () => {
        const id = item.getAttribute('data-id');
        const slot = timeSlots.find(s => s.id === id);
        handleSlotClick(slot);
      });
    });
  }

  function renderSummary() {
    const summaryText = document.getElementById('booking-summary-text');
    if (!summaryText) return;

    if (selectedDate && selectedSlot) {
      summaryText.innerHTML = `
        <strong>Delivery Slot Saved:</strong> ${formatDateLabel(selectedDate)} during the <strong>${selectedSlot.title}</strong> (${selectedSlot.time}).
      `;
    } else if (selectedDate) {
      summaryText.innerHTML = `
        <strong>Date Selected:</strong> ${formatDateLabel(selectedDate)}. Please choose a time window.
      `;
    } else {
      summaryText.innerHTML = `
        Please select a delivery date and time slot above.
      `;
    }
  }

  // Initial runs
  renderCalendar();
  renderSlots();
}
