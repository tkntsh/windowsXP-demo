/**
 * CONTEXT MENU MODULE
 * Right-click context menus for desktop and windows
 */

let activeMenu = null;

/**
 * Initialize context menu system
 */
export function initContextMenu() {
  // Prevent default context menu
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });
  
  // Close menu on click outside
  document.addEventListener('click', () => {
    closeContextMenu();
  });
  
  // Desktop context menu
  const desktop = document.getElementById('desktop');
  if (desktop) {
    desktop.addEventListener('contextmenu', (e) => {
      // Only show if clicking on desktop itself, not icons or windows
      if (e.target === desktop || e.target.classList.contains('desktop-icons')) {
        showDesktopContextMenu(e.clientX, e.clientY);
      }
    });
  }
}

/**
 * Show desktop context menu
 */
function showDesktopContextMenu(x, y) {
  closeContextMenu();
  
  const menu = document.createElement('div');
  menu.className = 'context-menu';
  menu.id = 'active-context-menu';
  
  menu.innerHTML = `
    <div class="menu-item" data-action="refresh">
      <span>Refresh</span>
    </div>
    <div class="menu-divider"></div>
    <div class="menu-item" data-action="new">
      <span>New ▶</span>
    </div>
    <div class="menu-divider"></div>
    <div class="menu-item" data-action="arrange-name">
      <span>Arrange Icons By Name</span>
    </div>
    <div class="menu-item" data-action="arrange-type">
      <span>Arrange Icons By Type</span>
    </div>
    <div class="menu-divider"></div>
    <div class="menu-item" data-action="properties">
      <span>Properties</span>
    </div>
  `;
  
  // Position menu
  menu.style.left = x + 'px';
  menu.style.top = y + 'px';
  menu.style.display = 'block';
  
  document.body.appendChild(menu);
  activeMenu = menu;
  
  // Adjust position if menu goes off-screen
  const rect = menu.getBoundingClientRect();
  if (rect.right > window.innerWidth) {
    menu.style.left = (x - rect.width) + 'px';
  }
  if (rect.bottom > window.innerHeight) {
    menu.style.top = (y - rect.height) + 'px';
  }
  
  // Handle menu item clicks
  menu.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      const action = item.dataset.action;
      handleDesktopAction(action);
      closeContextMenu();
    });
  });
}

/**
 * Show window context menu (for title bar right-click)
 */
export function showWindowContextMenu(x, y, windowId) {
  closeContextMenu();
  
  const menu = document.createElement('div');
  menu.className = 'context-menu';
  menu.id = 'active-context-menu';
  
  menu.innerHTML = `
    <div class="menu-item" data-action="restore">
      <span>Restore</span>
    </div>
    <div class="menu-item" data-action="minimize">
      <span>Minimize</span>
    </div>
    <div class="menu-item" data-action="maximize">
      <span>Maximize</span>
    </div>
    <div class="menu-divider"></div>
    <div class="menu-item" data-action="close">
      <span>Close</span>
    </div>
  `;
  
  menu.style.left = x + 'px';
  menu.style.top = y + 'px';
  menu.style.display = 'block';
  
  document.body.appendChild(menu);
  activeMenu = menu;
  
  // Handle menu item clicks
  menu.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', async (e) => {
      e.stopPropagation();
      const action = item.dataset.action;
      await handleWindowAction(action, windowId);
      closeContextMenu();
    });
  });
}

/**
 * Handle desktop context menu actions
 */
function handleDesktopAction(action) {
  switch (action) {
    case 'refresh':
      // Refresh desktop (reload page)
      location.reload();
      break;
    case 'new':
      // Show submenu for new items (simplified)
      alert('New item creation coming soon!');
      break;
    case 'arrange-name':
      alert('Arrange by name - feature coming soon!');
      break;
    case 'arrange-type':
      alert('Arrange by type - feature coming soon!');
      break;
    case 'properties':
      alert('Desktop properties - feature coming soon!');
      break;
  }
}

/**
 * Handle window context menu actions
 */
async function handleWindowAction(action, windowId) {
  const { minimizeWindow, toggleMaximize, closeWindow, restoreWindow } = await import('./window.js');
  
  switch (action) {
    case 'restore':
      restoreWindow(windowId);
      break;
    case 'minimize':
      minimizeWindow(windowId);
      break;
    case 'maximize':
      toggleMaximize(windowId);
      break;
    case 'close':
      closeWindow(windowId);
      break;
  }
}

/**
 * Close active context menu
 */
export function closeContextMenu() {
  if (activeMenu) {
    activeMenu.remove();
    activeMenu = null;
  }
}
