/**
 * HELPER UTILITIES
 * Common utility functions for Windows XP desktop environment
 */

/**
 * Format time for taskbar clock (HH:MM AM/PM)
 */
export function formatTime(date = new Date()) {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  
  hours = hours % 12;
  hours = hours ? hours : 12; // 0 should be 12
  
  const minutesStr = minutes < 10 ? '0' + minutes : minutes;
  
  return `${hours}:${minutesStr} ${ampm}`;
}

/**
 * Generate unique ID for windows
 */
export function generateId() {
  return 'win_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

/**
 * Clamp value between min and max
 */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Debounce function calls
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Get element position relative to viewport
 */
export function getElementPosition(element) {
  const rect = element.getBoundingClientRect();
  return {
    x: rect.left,
    y: rect.top,
    width: rect.width,
    height: rect.height
  };
}

/**
 * Check if click is outside element
 */
export function isClickOutside(event, element) {
  return !element.contains(event.target);
}

/**
 * Prevent text selection during drag
 */
export function preventSelection() {
  document.body.style.userSelect = 'none';
}

/**
 * Allow text selection after drag
 */
export function allowSelection() {
  document.body.style.userSelect = '';
}
