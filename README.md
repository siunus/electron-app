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
cp config.json.example config.json
```

### 5. Update the `config.json` file

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

Create or update `electron-builder.json` in the root directory with the following:

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