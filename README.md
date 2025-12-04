# Windows XP Desktop Environment 🪟

A pixel-perfect recreation of the Windows XP Luna theme desktop environment running entirely in the browser.

![Windows XP](https://img.shields.io/badge/Windows-XP-blue?style=for-the-badge&logo=windows)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## ✨ Features

### 🔐 Login Screen
- Two user profiles: **Administrator** and **Guest**
- Administrator requires password: `admin99*`
- Guest login with no password
- Smooth fade transition to desktop

### 🖥️ Desktop Environment
- Iconic **Bliss wallpaper** background
- Desktop icons:
  - My Computer
  - Recycle Bin
  - Notepad
  - My Gallery
- Icon selection and double-click to open
- Right-click context menu

### 📊 Taskbar
- Classic XP Start button with green gradient
- Start menu with two-panel layout
- Real-time clock (HH:MM AM/PM)
- System tray icons
- Active window buttons
- Quick launch area

### 🪟 Window Management
- **Draggable** windows by title bar
- **Resizable** from all edges and corners
- **Minimize** to taskbar
- **Maximize/Restore** toggle
- **Close** button
- Focus management (click to bring to front)
- Authentic XP window chrome

### 📝 Notepad Application
- Classic gray background and menu bar
- File operations:
  - **New**: Clear content
  - **Open**: Load local .txt files
  - **Save As**: Download as .txt
- **Auto-save** to IndexedDB
- Persists content across page refreshes

### 🖼️ My Gallery
- Grid display of 12 images
- Click to open full-size viewer
- Zoom controls:
  - Zoom In (+)
  - Zoom Out (-)
  - Reset (100%)
- Keyboard shortcuts: `+`, `-`, `0`

### 🎵 Sound Effects
- Startup sound
- Logon sound
- Window open/close sounds
- Minimize/maximize sounds
- (Currently using silent placeholders - can be replaced with actual XP sounds)

### 🖱️ Context Menus
- **Desktop right-click**:
  - Refresh
  - New
  - Arrange Icons
  - Properties
- **Window title bar right-click**:
  - Restore
  - Minimize
  - Maximize
  - Close

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ installed
- Modern web browser

### Installation

1. **Clone or navigate to the project**:
   ```bash
   cd demo2
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   - The app will automatically open at `http://localhost:3000`
   - Or manually visit the URL shown in the terminal

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
demo2/
├── assets/
│   ├── gallery/          # 12 gallery images
│   ├── images/           # Desktop icons and wallpaper
│   └── sounds/           # XP sound effects
├── src/
│   ├── modules/
│   │   ├── login.js      # Login screen logic
│   │   ├── desktop.js    # Desktop environment
│   │   ├── taskbar.js    # Taskbar and Start menu
│   │   ├── window.js     # Window management
│   │   ├── notepad.js    # Notepad application
│   │   ├── gallery.js    # Gallery application
│   │   ├── contextMenu.js # Context menus
│   │   ├── sounds.js     # Sound manager
│   │   └── storage.js    # IndexedDB wrapper
│   ├── styles/
│   │   └── main.css      # Custom XP styling
│   ├── utils/
│   │   └── helpers.js    # Utility functions
│   └── main.js           # Application entry point
├── index.html
├── package.json
├── vite.config.js
└── vercel.json
```

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```

3. **Or connect to GitHub**:
   - Push code to GitHub
   - Import repository in Vercel dashboard
   - Vercel auto-detects Vite configuration
   - Click "Deploy"

### Alternative Deployment Options

- **Netlify**: Drag-and-drop `dist/` folder or connect GitHub
- **Cloudflare Pages**: Fast CDN, Git integration
- **GitHub Pages**: Free hosting (requires base path config)

## 🎮 Usage

### Login
- Click **Administrator** → Enter password: `admin99*`
- Or click **Guest** for instant login

### Desktop
- **Single-click** icons to select
- **Double-click** to open applications
- **Right-click** desktop for context menu

### Windows
- **Drag** title bar to move
- **Drag** edges/corners to resize
- **Double-click** title bar to maximize
- Click **minimize** (`_`) to hide to taskbar
- Click **maximize** (`□`) to fill screen
- Click **close** (`×`) to close window

### Notepad
- Type in the text area
- Content auto-saves to browser storage
- **File → Open**: Load .txt files from your computer
- **File → Save As**: Download as .txt file

### Gallery
- Click any image to view full-size
- Use zoom buttons or keyboard shortcuts
- Press `Esc` or close button to exit viewer

## 🛠️ Tech Stack

- **Framework**: Vite 5
- **Language**: Vanilla JavaScript (ES6+)
- **Styling**: xp.css + Custom CSS
- **Storage**: IndexedDB
- **Deployment**: Vercel-ready

## 🎨 Customization

### Adding More Gallery Images
1. Place images in `assets/gallery/`
2. Update `GALLERY_IMAGES` array in `src/modules/gallery.js`

### Replacing Sound Effects
1. Add actual XP sound files to `assets/sounds/`
2. Update paths in `src/modules/sounds.js`

### Changing Wallpaper
- Replace `assets/images/bliss.png` with your image

## 📝 License

This project is for educational and nostalgic purposes. Windows XP and related trademarks are property of Microsoft Corporation.

## 🙏 Credits

- **xp.css**: CSS framework for Windows XP UI
- **Bliss Wallpaper**: Iconic Windows XP background
- **Icons**: Windows XP-style icons

---

**Made with nostalgia** 💙 **Relive the XP experience in your browser!**
