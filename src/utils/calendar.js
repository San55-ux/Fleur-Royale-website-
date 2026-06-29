/**
 * Calendar Helper Utility
 */

export function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

export function getFirstDayOfMonth(year, month) {
  // Returns 0 (Sun) through 6 (Sat)
  return new Date(year, month, 1).getDay();
}

/**
 * Returns an array of day objects representing the grid structure for a calendar.
 */
export function generateCalendarDays(year, month) {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayIndex = getFirstDayOfMonth(year, month);
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const days = [];
  
  // Empty slots for previous month padding
  for (let i = 0; i < firstDayIndex; i++) {
    days.push({
      dayNumber: '',
      isPadding: true,
      isDisabled: true
    });
  }
  
  // Real days of this month
  for (let d = 1; d <= daysInMonth; d++) {
    const cellDate = new Date(year, month, d);
    cellDate.setHours(0, 0, 0, 0);
    
    const isToday = cellDate.getTime() === today.getTime();
    
    // Disable past dates - flowers must be booked today or in the future
    const isDisabled = cellDate.getTime() < today.getTime();
    
    days.push({
      dayNumber: d,
      date: cellDate,
      isToday,
      isDisabled,
      isPadding: false
    });
  }
  
  return days;
}

export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export function formatDateLabel(date) {
  if (!date) return '';
  const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}
