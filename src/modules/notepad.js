/**
 * NOTEPAD APPLICATION MODULE
 * Classic Windows XP Notepad with file operations and persistence
 */

import { createWindow } from './window.js';
import { saveNote, loadNote } from './storage.js';
import { debounce } from '../utils/helpers.js';

let notepadWindow = null;
let currentContent = '';

/**
 * Open Notepad application
 */
export async function openNotepad() {
  // If already open, just focus it
  if (notepadWindow && document.getElementById(notepadWindow.id)) {
    const { focusWindow } = await import('./window.js');
    focusWindow(notepadWindow.id);
    return;
  }
  
  // Load saved content
  try {
    currentContent = await loadNote();
  } catch (err) {
    console.error('Failed to load note:', err);
    currentContent = '';
  }
  
  // Create notepad window content
  const content = `
    <div style="display: flex; flex-direction: column; height: 100%; padding: 0;">
      <div class="notepad-menubar">
        <span data-menu="file">File</span>
        <span data-menu="edit">Edit</span>
        <span data-menu="format">Format</span>
        <span data-menu="view">View</span>
        <span data-menu="help">Help</span>
      </div>
      <textarea 
        class="notepad-textarea" 
        id="notepad-content"
        placeholder="Type your text here..."
      >${currentContent}</textarea>
    </div>
  `;
  
  // Create window
  notepadWindow = createWindow({
    title: 'Untitled - Notepad',
    icon: '/assets/images/notepad.png',
    content,
    width: 600,
    height: 400
  });
  
  // Set up notepad functionality
  setupNotepadEvents();
}

/**
 * Set up Notepad event listeners
 */
function setupNotepadEvents() {
  const textarea = document.getElementById('notepad-content');
  if (!textarea) return;
  
  // Auto-save on content change (debounced)
  const autoSave = debounce(async (content) => {
    try {
      await saveNote(content);
      console.log('Note auto-saved');
    } catch (err) {
      console.error('Failed to save note:', err);
    }
  }, 1000);
  
  textarea.addEventListener('input', (e) => {
    currentContent = e.target.value;
    autoSave(currentContent);
  });
  
  // Menu bar functionality
  const menuItems = notepadWindow.element.querySelectorAll('[data-menu]');
  menuItems.forEach(item => {
    item.addEventListener('click', () => {
      const menu = item.dataset.menu;
      handleMenuClick(menu);
    });
  });
}

/**
 * Handle menu bar clicks
 */
function handleMenuClick(menu) {
  switch (menu) {
    case 'file':
      showFileMenu();
      break;
    case 'edit':
      // Edit menu functionality (optional)
      break;
    case 'format':
      // Format menu functionality (optional)
      break;
    case 'view':
      // View menu functionality (optional)
      break;
    case 'help':
      // Help menu functionality (optional)
      break;
  }
}

/**
 * Show File menu options
 */
function showFileMenu() {
  const menu = document.createElement('div');
  menu.className = 'context-menu';
  menu.style.display = 'block';
  
  // Position near File menu item
  const fileMenuItem = notepadWindow.element.querySelector('[data-menu="file"]');
  const rect = fileMenuItem.getBoundingClientRect();
  menu.style.left = rect.left + 'px';
  menu.style.top = rect.bottom + 'px';
  
  menu.innerHTML = `
    <div class="menu-item" data-action="new">New</div>
    <div class="menu-item" data-action="open">Open...</div>
    <div class="menu-item" data-action="save">Save As...</div>
    <div class="menu-divider"></div>
    <div class="menu-item" data-action="exit">Exit</div>
  `;
  
  document.body.appendChild(menu);
  
  // Handle menu item clicks
  menu.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', () => {
      const action = item.dataset.action;
      handleFileAction(action);
      menu.remove();
    });
  });
  
  // Close menu on outside click
  setTimeout(() => {
    const closeMenu = (e) => {
      if (!menu.contains(e.target)) {
        menu.remove();
        document.removeEventListener('click', closeMenu);
      }
    };
    document.addEventListener('click', closeMenu);
  }, 0);
}

/**
 * Handle File menu actions
 */
function handleFileAction(action) {
  switch (action) {
    case 'new':
      newFile();
      break;
    case 'open':
      openFile();
      break;
    case 'save':
      saveFile();
      break;
    case 'exit':
      closeNotepad();
      break;
  }
}

/**
 * Create new file (clear content)
 */
function newFile() {
  const textarea = document.getElementById('notepad-content');
  if (textarea) {
    textarea.value = '';
    currentContent = '';
    saveNote('');
  }
}

/**
 * Open local text file
 */
function openFile() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.txt';
  
  input.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      const textarea = document.getElementById('notepad-content');
      if (textarea) {
        textarea.value = content;
        currentContent = content;
        saveNote(content);
      }
    };
    reader.readAsText(file);
  });
  
  input.click();
}

/**
 * Save file as .txt (download)
 */
function saveFile() {
  const textarea = document.getElementById('notepad-content');
  if (!textarea) return;
  
  const content = textarea.value;
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = 'document.txt';
  a.click();
  
  URL.revokeObjectURL(url);
}

/**
 * Close Notepad
 */
function closeNotepad() {
  if (notepadWindow) {
    const { closeWindow } = require('./window.js');
    closeWindow(notepadWindow.id);
    notepadWindow = null;
  }
}
