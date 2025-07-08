# Electron App

An Electron-based desktop wrapper for a web application with local and public fallback, splash screen, and customizable settings.

---

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/siunus/electron-app.git
```

### 2. Navigate into the project directory

```bash
cd electron-app
```

### 3. Install dependencies

```bash
npm install
```

### 4. Copy the example configuration file

```bash
cp src/config.json.example src/config.json
```

### 5. Update the `src/config.json` file

```json
{
  "appName": "My App",
  "localAddress": "http://192.168.1.222:9001",
  "publicAddress": "https://example.com",
  "autoMaximize": true
}
```

### 6. Run the application

```bash
npm run start
```

---

## 🛠 Build Configuration

### 7. Copy the example electron-builder file

```bash
cp electron-builder.json.example electron-builder.json
```

### 8. Set up `electron-builder.json` for building

Update `electron-builder.json` in the root directory with the following:

```json
{
  "appId": "com.example.myapp",
  "productName": "My App",
  "directories": {
    "buildResources": "assets"
  },
  "files": ["src/**/*", "assets/**/*"],
  "win": {
    "icon": "assets/favicon.ico",
    "target": ["nsis", "portable"]
  },
  "linux": {
    "icon": "assets/icon.png",
    "target": ["AppImage", "deb"],
    "category": "Utility"
  },
  "mac": {
    "icon": "assets/icon.icns",
    "target": ["dmg", "zip"],
    "category": "public.app-category.utilities"
  }
}
```

---

## 📦 Build the Application

### 9. Build for different platforms

```bash
npm run build:win     # Build for Windows
npm run build:linux   # Build for Linux
npm run build:mac     # Build for macOS
```


---

## 📁 Output

### 10. Built files will be available in the `dist/` directory
---

## 🎨 Optional: Change Application Icons

You can customize the icons used in the build process:

- **Windows icon**: Replace `assets/favicon.ico` with your `.ico` file (recommended size: 256x256).
- **Linux icon**: Replace `assets/icon.png` with a `.png` file (recommended size: 512x512).
- **macOS icon**: Replace `assets/icon.icns` with your `.icns` file (recommended size: 512x512 or 1024x1024). You can use tools like [iconutil](https://ss64.com/osx/iconutil.html) or online converters to create a `.icns` file from PNG images.

Ensure the filenames and paths match those defined in `electron-builder.json`:

```json
"win": {
  "icon": "assets/favicon.ico"
},
"linux": {
  "icon": "assets/icon.png"
},
"mac": {
  "icon": "assets/icon.icns"
}
```