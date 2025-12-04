/**
 * LOGIN MODULE
 * Handles Windows XP login screen with user authentication
 */

import { soundManager } from './sounds.js';
import { setLoggedUser } from './taskbar.js';

const ADMIN_PASSWORD = 'admin99*';
let currentUser = null;

/**
 * Initialize login screen
 */
export function initLogin() {
  const loginScreen = document.getElementById('login-screen');
  const userOptions = document.querySelectorAll('.user-option');
  
  // User selection
  userOptions.forEach(option => {
    option.addEventListener('click', () => {
      const user = option.dataset.user;
      handleUserSelection(user);
    });
  });
  
  // Password dialog
  setupPasswordDialog();
}

/**
 * Handle user selection
 */
function handleUserSelection(user) {
  currentUser = user;
  
  if (user === 'admin') {
    // Show password dialog for Administrator
    showPasswordDialog();
  } else if (user === 'guest') {
    // Guest login directly
    login('Guest');
  }
}

/**
 * Show password dialog
 */
function showPasswordDialog() {
  const dialog = document.getElementById('password-dialog');
  dialog.style.display = 'flex';
  
  // Focus password input
  const passwordInput = document.getElementById('password-input');
  passwordInput.value = '';
  setTimeout(() => passwordInput.focus(), 100);
}

/**
 * Hide password dialog
 */
function hidePasswordDialog() {
  const dialog = document.getElementById('password-dialog');
  dialog.style.display = 'none';
}

/**
 * Set up password dialog event listeners
 */
function setupPasswordDialog() {
  const passwordInput = document.getElementById('password-input');
  const okButton = document.getElementById('password-ok');
  const cancelButton = document.getElementById('password-cancel');
  const closeButton = document.getElementById('password-close');
  
  // OK button
  okButton.addEventListener('click', () => {
    validatePassword(passwordInput.value);
  });
  
  // Enter key
  passwordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      validatePassword(passwordInput.value);
    }
  });
  
  // Cancel button
  cancelButton.addEventListener('click', () => {
    hidePasswordDialog();
    currentUser = null;
  });
  
  // Close button
  closeButton.addEventListener('click', () => {
    hidePasswordDialog();
    currentUser = null;
  });
}

/**
 * Validate administrator password
 */
function validatePassword(password) {
  if (password === ADMIN_PASSWORD) {
    hidePasswordDialog();
    login('Administrator');
  } else {
    // Show error
    alert('The password is incorrect. Please try again.');
    const passwordInput = document.getElementById('password-input');
    passwordInput.value = '';
    passwordInput.focus();
  }
}

/**
 * Perform login and show desktop
 */
function login(username) {
  // Play logon sound
  soundManager.playLogon();
  
  // Set logged user
  setLoggedUser(username);
  
  // Fade out login screen
  const loginScreen = document.getElementById('login-screen');
  loginScreen.classList.add('fade-out');
  
  // Show desktop after fade
  setTimeout(() => {
    loginScreen.style.display = 'none';
    
    const desktop = document.getElementById('desktop');
    desktop.style.display = 'block';
    desktop.classList.add('fade-in');
  }, 800);
}
