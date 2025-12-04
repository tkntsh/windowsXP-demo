/**
 * MY GALLERY APPLICATION MODULE
 * Image gallery with full-size viewer and zoom controls
 */

import { createWindow } from './window.js';

// Gallery image paths
const GALLERY_IMAGES = [
  '/assets/gallery/card1.jpeg',
  '/assets/gallery/card2.jpeg',
  '/assets/gallery/card3.jpeg',
  '/assets/gallery/card4.jpeg',
  '/assets/gallery/card5.jpeg',
  '/assets/gallery/card6.jpeg',
  '/assets/gallery/card7.jpeg',
  '/assets/gallery/card8.jpeg',
  '/assets/gallery/card9.jpeg',
  '/assets/gallery/card10.jpeg',
  '/assets/gallery/card11.jpeg',
  '/assets/gallery/card12.jpeg'
];

let galleryWindow = null;

/**
 * Open My Gallery application
 */
export function openGallery() {
  // If already open, just focus it
  if (galleryWindow && document.getElementById(galleryWindow.id)) {
    const { focusWindow } = require('./window.js');
    focusWindow(galleryWindow.id);
    return;
  }
  
  // Create gallery grid HTML
  const galleryHTML = GALLERY_IMAGES.map((imgPath, index) => `
    <div class="gallery-item" data-image="${imgPath}" data-index="${index}">
      <img src="${imgPath}" alt="Image ${index + 1}" loading="lazy">
    </div>
  `).join('');
  
  const content = `
    <div class="gallery-grid">
      ${galleryHTML}
    </div>
  `;
  
  // Create window
  galleryWindow = createWindow({
    title: 'My Gallery',
    icon: '/assets/images/my-gallery.png',
    content,
    width: 700,
    height: 500
  });
  
  // Set up gallery events
  setupGalleryEvents();
}

/**
 * Set up gallery event listeners
 */
function setupGalleryEvents() {
  const galleryItems = galleryWindow.element.querySelectorAll('.gallery-item');
  
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const imagePath = item.dataset.image;
      const imageIndex = parseInt(item.dataset.index);
      openImageViewer(imagePath, imageIndex);
    });
  });
}

/**
 * Open image viewer for full-size image
 */
function openImageViewer(imagePath, imageIndex) {
  let currentZoom = 1;
  
  const content = `
    <div class="image-viewer">
      <div class="image-viewer-controls">
        <button id="zoom-out">Zoom Out (-)</button>
        <button id="zoom-in">Zoom In (+)</button>
        <button id="zoom-reset">Reset (100%)</button>
        <span style="margin-left: auto; font-size: 11px;">Image ${imageIndex + 1} of ${GALLERY_IMAGES.length}</span>
      </div>
      <div class="image-viewer-content">
        <img id="viewer-image" src="${imagePath}" alt="Image ${imageIndex + 1}">
      </div>
    </div>
  `;
  
  const viewerWindow = createWindow({
    title: `Image ${imageIndex + 1} - My Gallery`,
    icon: '/assets/images/my-gallery.png',
    content,
    width: 800,
    height: 600
  });
  
  // Set up zoom controls
  const viewerImage = viewerWindow.element.querySelector('#viewer-image');
  const zoomInBtn = viewerWindow.element.querySelector('#zoom-in');
  const zoomOutBtn = viewerWindow.element.querySelector('#zoom-out');
  const zoomResetBtn = viewerWindow.element.querySelector('#zoom-reset');
  
  const updateZoom = (zoom) => {
    currentZoom = Math.max(0.25, Math.min(4, zoom));
    viewerImage.style.transform = `scale(${currentZoom})`;
  };
  
  zoomInBtn.addEventListener('click', () => {
    updateZoom(currentZoom + 0.25);
  });
  
  zoomOutBtn.addEventListener('click', () => {
    updateZoom(currentZoom - 0.25);
  });
  
  zoomResetBtn.addEventListener('click', () => {
    updateZoom(1);
  });
  
  // Keyboard shortcuts
  const handleKeyPress = (e) => {
    if (e.key === '+' || e.key === '=') {
      updateZoom(currentZoom + 0.25);
    } else if (e.key === '-') {
      updateZoom(currentZoom - 0.25);
    } else if (e.key === '0') {
      updateZoom(1);
    }
  };
  
  viewerWindow.element.addEventListener('keydown', handleKeyPress);
}
