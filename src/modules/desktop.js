/**
 * DESKTOP MODULE
 * Manages desktop environment and desktop icons
 */

import { openNotepad } from './notepad.js';
import { openGallery } from './gallery.js';
import { openAbout } from './about.js';
import { createWindow } from './window.js';

let selectedIcon = null;

/**
 * Initialize desktop environment
 */
export function initDesktop() {
  const desktop = document.getElementById('desktop');
  
  // Desktop icon interactions
  setupDesktopIcons();
  
  // Click on desktop to deselect icons
  desktop.addEventListener('click', (e) => {
    if (e.target === desktop || e.target.classList.contains('desktop-icons')) {
      deselectAllIcons();
    }
  });
}

/**
 * Set up desktop icon event listeners
 */
function setupDesktopIcons() {
  const icons = document.querySelectorAll('.desktop-icon');
  
  icons.forEach(icon => {
    // Single click to select
    icon.addEventListener('click', (e) => {
      e.stopPropagation();
      selectIcon(icon);
    });
    
    // Double click to open
    icon.addEventListener('dblclick', (e) => {
      e.stopPropagation();
      const appName = icon.dataset.app;
      openDesktopApplication(appName);
    });
  });
}

/**
 * Select a desktop icon
 */
function selectIcon(icon) {
  deselectAllIcons();
  icon.classList.add('selected');
  selectedIcon = icon;
}

/**
 * Deselect all desktop icons
 */
function deselectAllIcons() {
  const icons = document.querySelectorAll('.desktop-icon');
  icons.forEach(icon => icon.classList.remove('selected'));
  selectedIcon = null;
}

/**
 * Open application from desktop icon
 */
function openDesktopApplication(appName) {
  switch (appName) {
    case 'my-computer':
      openMyComputer();
      break;
    case 'recycle-bin':
      openRecycleBin();
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
 * Open My Computer
 */
function openMyComputer() {
  const content = `
    <div style="padding: 20px;">
      <h3>My Computer</h3>
      <div style="margin-top: 20px;">
        <p><strong>💾 Local Disk (C:)</strong></p>
        <p><strong>💿 CD Drive (D:)</strong></p>
        <p style="margin-top: 20px; color: #666; font-size: 12px;">
          This is a simulated My Computer window.
        </p>
      </div>
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
 * Open Recycle Bin
 */
function openRecycleBin() {
  const content = `
    <div style="padding: 20px; text-align: center;">
      <img src="/assets/images/recycle-bin.png" alt="Recycle Bin" style="width: 64px; height: 64px; margin-bottom: 20px;">
      <h3>Recycle Bin</h3>
      <p style="margin-top: 20px; color: #666;">
        The Recycle Bin is empty.
      </p>
    </div>
  `;
  
  createWindow({
    title: 'Recycle Bin',
    icon: '/assets/images/recycle-bin.png',
    content,
    width: 450,
    height: 350
  });
}

/**
 * Show desktop (minimize all windows)
 */
export function showDesktop() {
  // This would minimize all windows
  // Implementation depends on window management
}
