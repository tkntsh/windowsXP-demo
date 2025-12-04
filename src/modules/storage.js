/**
 * INDEXEDDB STORAGE MODULE
 * Handles persistent storage for Notepad content
 */

const DB_NAME = 'WindowsXP_DB';
const DB_VERSION = 1;
const STORE_NAME = 'notepad';

let db = null;

/**
 * Initialize IndexedDB
 */
export async function initStorage() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    
    request.onerror = () => {
      console.error('IndexedDB error:', request.error);
      reject(request.error);
    };
    
    request.onsuccess = () => {
      db = request.result;
      console.log('IndexedDB initialized');
      resolve(db);
    };
    
    request.onupgradeneeded = (event) => {
      db = event.target.result;
      
      // Create object store for notepad if it doesn't exist
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
  });
}

/**
 * Save note content to IndexedDB
 */
export async function saveNote(content) {
  if (!db) {
    await initStorage();
  }
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    
    const note = {
      id: 'default',
      content: content,
      timestamp: Date.now()
    };
    
    const request = store.put(note);
    
    request.onsuccess = () => {
      resolve(note);
    };
    
    request.onerror = () => {
      reject(request.error);
    };
  });
}

/**
 * Load note content from IndexedDB
 */
export async function loadNote() {
  if (!db) {
    await initStorage();
  }
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get('default');
    
    request.onsuccess = () => {
      if (request.result) {
        resolve(request.result.content);
      } else {
        resolve(''); // Return empty string if no note exists
      }
    };
    
    request.onerror = () => {
      reject(request.error);
    };
  });
}

/**
 * Clear note content from IndexedDB
 */
export async function clearNote() {
  if (!db) {
    await initStorage();
  }
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete('default');
    
    request.onsuccess = () => {
      resolve();
    };
    
    request.onerror = () => {
      reject(request.error);
    };
  });
}
