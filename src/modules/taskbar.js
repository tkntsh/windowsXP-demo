/**
 * TASKBAR MODULE
 * Manages taskbar, Start button, Start menu, and system tray
 */

import { formatTime } from '../utils/helpers.js';
import { openNotepad } from './notepad.js';
import { openGallery } from './gallery.js';
import { openAbout } from './about.js';
import { createWindow } from './window.js';

let startMenuOpen = false;

/**
 * Initialize taskbar
 */
export function initTaskbar() {
  // Start button
  const startButton = document.getElementById('start-button');
  startButton.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleStartMenu();
  });
  
  // Update clock
  updateClock();
  setInterval(updateClock, 1000);
  
  // Start menu items
  setupStartMenu();
  
  // Close Start menu on outside click
  document.addEventListener('click', (e) => {
    const startMenu = document.getElementById('start-menu');
    if (startMenuOpen && !startMenu.contains(e.target) && e.target !== startButton) {
      closeStartMenu();
    }
  });
}

/**
 * Update taskbar clock
 */
function updateClock() {
  const clockEl = document.getElementById('clock');
  if (clockEl) {
    clockEl.textContent = formatTime();
  }
}

/**
 * Toggle Start menu
 */
function toggleStartMenu() {
  if (startMenuOpen) {
    closeStartMenu();
  } else {
    openStartMenu();
  }
}

/**
 * Open Start menu
 */
function openStartMenu() {
  const startMenu = document.getElementById('start-menu');
  const startButton = document.getElementById('start-button');
  
  startMenu.style.display = 'flex';
  startButton.classList.add('active');
  startMenuOpen = true;
}

/**
 * Close Start menu
 */
function closeStartMenu() {
  const startMenu = document.getElementById('start-menu');
  const startButton = document.getElementById('start-button');
  
  startMenu.style.display = 'none';
  startButton.classList.remove('active');
  startMenuOpen = false;
}

/**
 * Set up Start menu event listeners
 */
function setupStartMenu() {
  const menuItems = document.querySelectorAll('#start-menu .menu-item');
  
  menuItems.forEach(item => {
    item.addEventListener('click', () => {
      const app = item.dataset.app;
      const action = item.dataset.action;
      
      if (app) {
        openApplication(app);
      } else if (action) {
        handleSystemAction(action);
      }
      
      closeStartMenu();
    });
  });
}

/**
 * Open application from Start menu
 */
function openApplication(appName) {
  switch (appName) {
    case 'my-computer':
      openMyComputer();
      break;
    case 'notepad':
      openNotepad();
      break;
    case 'my-gallery':
      openGallery();
      break;
    case 'about':
      openAbout();
      break;
  }
}

/**
 * Open My Computer (placeholder)
 */
function openMyComputer() {
  const content = `
    <div style="padding: 20px;">
      <h3>My Computer</h3>
      <p>This is a placeholder for My Computer.</p>
      <p>In a full implementation, this would show drives, folders, and system information.</p>
    </div>
  `;
  
  createWindow({
    title: 'My Computer',
    icon: '/assets/images/my-computer.png',
    content,
    width: 500,
    height: 400
  });
}

/**
 * Handle system actions (Log Off, Shut Down)
 */
function handleSystemAction(action) {
  switch (action) {
    case 'logoff':
      if (confirm('Are you sure you want to log off?')) {
        location.reload();
      }
      break;
    case 'shutdown':
      if (confirm('Are you sure you want to turn off the computer?')) {
        // Show shutdown screen
        document.body.innerHTML = `
          <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #0054e3;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 24px;
            font-family: Tahoma, sans-serif;
          ">
            <div style="text-align: center;">
              <p>It's now safe to turn off your computer.</p>
              <p style="font-size: 16px; margin-top: 20px; opacity: 0.8;">
                You can close this browser tab.
              </p>
            </div>
          </div>
        `;
      }
      break;
  }
}

/**
 * Set logged-in user name
 */
export function setLoggedUser(username) {
  const userDisplay = document.getElementById('logged-user');
  if (userDisplay) {
    userDisplay.textContent = username;
  }
}
