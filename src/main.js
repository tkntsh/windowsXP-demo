/**
 * MAIN APPLICATION ENTRY POINT
 * Windows XP Desktop Environment
 */

import { initLogin } from './modules/login.js';
import { initDesktop } from './modules/desktop.js';
import { initTaskbar } from './modules/taskbar.js';
import { initContextMenu } from './modules/contextMenu.js';
import { initStorage } from './modules/storage.js';
import { soundManager } from './modules/sounds.js';

/**
 * Initialize the application
 */
async function init() {
  console.log('🪟 Windows XP Desktop Environment - Starting...');
  
  try {
    // Initialize IndexedDB storage
    await initStorage();
    console.log('✅ Storage initialized');
    
    // Initialize login screen
    initLogin();
    console.log('✅ Login screen initialized');
    
    // Initialize desktop (will be shown after login)
    initDesktop();
    console.log('✅ Desktop initialized');
    
    // Initialize taskbar
    initTaskbar();
    console.log('✅ Taskbar initialized');
    
    // Initialize context menus
    initContextMenu();
    console.log('✅ Context menus initialized');
    
    // Play startup sound (optional - commented out to avoid autoplay issues)
    // soundManager.playStartup();
    
    console.log('🎉 Windows XP Desktop Environment - Ready!');
    
  } catch (error) {
    console.error('❌ Failed to initialize application:', error);
  }
}

// Start the application when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Export for debugging
window.xpDesktop = {
  soundManager
};
