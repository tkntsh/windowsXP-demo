/**
 * WINDOW MANAGEMENT MODULE
 * Handles creation and management of draggable, resizable XP windows
 */

import { generateId, clamp, preventSelection, allowSelection } from '../utils/helpers.js';
import { soundManager } from './sounds.js';

// Track all windows and z-index
const windows = new Map();
let highestZIndex = 100;

/**
 * Create a new XP-style window
 */
export function createWindow({ title, icon, content, width = 600, height = 400, x, y }) {
  const windowId = generateId();
  
  // Calculate default position (cascade from top-left)
  const defaultX = x !== undefined ? x : 100 + (windows.size * 30);
  const defaultY = y !== undefined ? y : 80 + (windows.size * 30);
  
  // Create window element
  const windowEl = document.createElement('div');
  windowEl.className = 'xp-window active';
  windowEl.id = windowId;
  windowEl.style.width = width + 'px';
  windowEl.style.height = height + 'px';
  windowEl.style.left = defaultX + 'px';
  windowEl.style.top = defaultY + 'px';
  windowEl.style.zIndex = ++highestZIndex;
  
  // Build window HTML structure
  windowEl.innerHTML = `
    <div class="xp-title-bar">
      <div class="xp-title-bar-text">
        ${icon ? `<img src="${icon}" alt="">` : ''}
        <span>${title}</span>
      </div>
      <div class="xp-title-bar-controls">
        <button class="btn-minimize" data-action="minimize"></button>
        <button class="btn-maximize" data-action="maximize"></button>
        <button class="btn-close" data-action="close"></button>
      </div>
    </div>
    <div class="xp-window-body">
      ${content}
    </div>
    <!-- Resize handles -->
    <div class="resize-handle resize-n" data-resize="n"></div>
    <div class="resize-handle resize-s" data-resize="s"></div>
    <div class="resize-handle resize-e" data-resize="e"></div>
    <div class="resize-handle resize-w" data-resize="w"></div>
    <div class="resize-handle resize-nw" data-resize="nw"></div>
    <div class="resize-handle resize-ne" data-resize="ne"></div>
    <div class="resize-handle resize-sw" data-resize="sw"></div>
    <div class="resize-handle resize-se" data-resize="se"></div>
  `;
  
  // Add to DOM
  const container = document.getElementById('windows-container');
  container.appendChild(windowEl);
  
  // Store window data
  const windowData = {
    id: windowId,
    element: windowEl,
    title,
    icon,
    minimized: false,
    maximized: false,
    savedState: { x: defaultX, y: defaultY, width, height }
  };
  
  windows.set(windowId, windowData);
  
  // Set up event listeners
  setupWindowEvents(windowData);
  
  // Add to taskbar
  addToTaskbar(windowData);
  
  // Play window open sound
  soundManager.playWindowOpen();
  
  return windowData;
}

/**
 * Set up all window event listeners
 */
function setupWindowEvents(windowData) {
  const { element, id } = windowData;
  
  // Title bar controls
  const controls = element.querySelectorAll('.xp-title-bar-controls button');
  controls.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const action = btn.dataset.action;
      
      if (action === 'minimize') minimizeWindow(id);
      else if (action === 'maximize') toggleMaximize(id);
      else if (action === 'close') closeWindow(id);
    });
  });
  
  // Focus on click
  element.addEventListener('mousedown', () => focusWindow(id));
  
  // Dragging
  const titleBar = element.querySelector('.xp-title-bar');
  setupDragging(titleBar, windowData);
  
  // Resizing
  const resizeHandles = element.querySelectorAll('.resize-handle');
  resizeHandles.forEach(handle => {
    setupResizing(handle, windowData);
  });
}

/**
 * Set up window dragging
 */
function setupDragging(titleBar, windowData) {
  let isDragging = false;
  let startX, startY, initialX, initialY;
  
  // Mouse events for desktop
  titleBar.addEventListener('mousedown', (e) => {
    // Don't drag if clicking on buttons
    if (e.target.closest('button')) return;
    
    // Don't drag if maximized
    if (windowData.maximized) return;
    
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    
    const rect = windowData.element.getBoundingClientRect();
    initialX = rect.left;
    initialY = rect.top;
    
    preventSelection();
    
    const onMouseMove = (e) => {
      if (!isDragging) return;
      
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      
      const newX = clamp(initialX + deltaX, 0, window.innerWidth - 100);
      const newY = clamp(initialY + deltaY, 0, window.innerHeight - 100);
      
      windowData.element.style.left = newX + 'px';
      windowData.element.style.top = newY + 'px';
    };
    
    const onMouseUp = () => {
      isDragging = false;
      allowSelection();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
  
  // Touch events for mobile
  titleBar.addEventListener('touchstart', (e) => {
    // Don't drag if touching buttons
    if (e.target.closest('button')) return;
    
    // Don't drag if maximized
    if (windowData.maximized) return;
    
    const touch = e.touches[0];
    isDragging = true;
    startX = touch.clientX;
    startY = touch.clientY;
    
    const rect = windowData.element.getBoundingClientRect();
    initialX = rect.left;
    initialY = rect.top;
    
    preventSelection();
    
    const onTouchMove = (e) => {
      if (!isDragging) return;
      
      e.preventDefault(); // Prevent scrolling while dragging
      const touch = e.touches[0];
      
      const deltaX = touch.clientX - startX;
      const deltaY = touch.clientY - startY;
      
      const newX = clamp(initialX + deltaX, 0, window.innerWidth - 100);
      const newY = clamp(initialY + deltaY, 0, window.innerHeight - 100);
      
      windowData.element.style.left = newX + 'px';
      windowData.element.style.top = newY + 'px';
    };
    
    const onTouchEnd = () => {
      isDragging = false;
      allowSelection();
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
    };
    
    document.addEventListener('touchmove', onTouchMove, { passive: false });
    document.addEventListener('touchend', onTouchEnd);
  });
  
  // Double-click to maximize (desktop only)
  titleBar.addEventListener('dblclick', (e) => {
    if (e.target.closest('button')) return;
    toggleMaximize(windowData.id);
  });
}

/**
 * Set up window resizing
 */
function setupResizing(handle, windowData) {
  handle.addEventListener('mousedown', (e) => {
    e.stopPropagation();
    
    // Don't resize if maximized
    if (windowData.maximized) return;
    
    const direction = handle.dataset.resize;
    const startX = e.clientX;
    const startY = e.clientY;
    
    const rect = windowData.element.getBoundingClientRect();
    const initialWidth = rect.width;
    const initialHeight = rect.height;
    const initialLeft = rect.left;
    const initialTop = rect.top;
    
    preventSelection();
    
    const onMouseMove = (e) => {
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      
      let newWidth = initialWidth;
      let newHeight = initialHeight;
      let newLeft = initialLeft;
      let newTop = initialTop;
      
      // Handle different resize directions
      if (direction.includes('e')) {
        newWidth = Math.max(300, initialWidth + deltaX);
      }
      if (direction.includes('w')) {
        newWidth = Math.max(300, initialWidth - deltaX);
        newLeft = initialLeft + (initialWidth - newWidth);
      }
      if (direction.includes('s')) {
        newHeight = Math.max(200, initialHeight + deltaY);
      }
      if (direction.includes('n')) {
        newHeight = Math.max(200, initialHeight - deltaY);
        newTop = initialTop + (initialHeight - newHeight);
      }
      
      windowData.element.style.width = newWidth + 'px';
      windowData.element.style.height = newHeight + 'px';
      windowData.element.style.left = newLeft + 'px';
      windowData.element.style.top = newTop + 'px';
    };
    
    const onMouseUp = () => {
      allowSelection();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
}

/**
 * Focus a window (bring to front)
 */
export function focusWindow(windowId) {
  const windowData = windows.get(windowId);
  if (!windowData) return;
  
  // Remove active class from all windows
  windows.forEach(w => {
    w.element.classList.remove('active');
    w.element.classList.add('inactive');
  });
  
  // Add active class to this window
  windowData.element.classList.remove('inactive');
  windowData.element.classList.add('active');
  windowData.element.style.zIndex = ++highestZIndex;
  
  // Update taskbar
  updateTaskbarButtons();
}

/**
 * Minimize a window
 */
export function minimizeWindow(windowId) {
  const windowData = windows.get(windowId);
  if (!windowData) return;
  
  windowData.minimized = true;
  windowData.element.classList.add('minimized');
  
  soundManager.playMinimize();
  updateTaskbarButtons();
}

/**
 * Restore a minimized window
 */
export function restoreWindow(windowId) {
  const windowData = windows.get(windowId);
  if (!windowData) return;
  
  windowData.minimized = false;
  windowData.element.classList.remove('minimized');
  
  focusWindow(windowId);
  updateTaskbarButtons();
}

/**
 * Toggle maximize/restore
 */
export function toggleMaximize(windowId) {
  const windowData = windows.get(windowId);
  if (!windowData) return;
  
  if (windowData.maximized) {
    // Restore
    windowData.maximized = false;
    windowData.element.classList.remove('maximized');
    
    const { x, y, width, height } = windowData.savedState;
    windowData.element.style.left = x + 'px';
    windowData.element.style.top = y + 'px';
    windowData.element.style.width = width + 'px';
    windowData.element.style.height = height + 'px';
  } else {
    // Save current state
    const rect = windowData.element.getBoundingClientRect();
    windowData.savedState = {
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height
    };
    
    // Maximize
    windowData.maximized = true;
    windowData.element.classList.add('maximized');
    
    soundManager.playMaximize();
  }
}

/**
 * Close a window
 */
export function closeWindow(windowId) {
  const windowData = windows.get(windowId);
  if (!windowData) return;
  
  // Remove from DOM
  windowData.element.remove();
  
  // Remove from windows map
  windows.delete(windowId);
  
  // Remove from taskbar
  removeFromTaskbar(windowId);
  
  soundManager.playWindowClose();
}

/**
 * Add window to taskbar
 */
function addToTaskbar(windowData) {
  const taskbarWindows = document.getElementById('taskbar-windows');
  
  const button = document.createElement('button');
  button.className = 'taskbar-window-button active';
  button.dataset.windowId = windowData.id;
  
  button.innerHTML = `
    ${windowData.icon ? `<img src="${windowData.icon}" alt="">` : ''}
    <span>${windowData.title}</span>
  `;
  
  button.addEventListener('click', () => {
    if (windowData.minimized) {
      restoreWindow(windowData.id);
    } else {
      focusWindow(windowData.id);
    }
  });
  
  taskbarWindows.appendChild(button);
}

/**
 * Remove window from taskbar
 */
function removeFromTaskbar(windowId) {
  const button = document.querySelector(`[data-window-id="${windowId}"]`);
  if (button) button.remove();
}

/**
 * Update taskbar button states
 */
function updateTaskbarButtons() {
  windows.forEach(windowData => {
    const button = document.querySelector(`[data-window-id="${windowData.id}"]`);
    if (!button) return;
    
    if (windowData.element.classList.contains('active')) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });
}

/**
 * Get window by ID
 */
export function getWindow(windowId) {
  return windows.get(windowId);
}

/**
 * Get all windows
 */
export function getAllWindows() {
  return Array.from(windows.values());
}
