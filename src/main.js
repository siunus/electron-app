import { app, BrowserWindow, session, ipcMain } from "electron";
import { fileURLToPath } from "url";
import { readFileSync } from "fs";
import path from "path";
import http from "http";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load konfigurasi
const configPath = path.join(__dirname, "config.json");
const config = JSON.parse(readFileSync(configPath, "utf-8"));

// Deteksi alamat lokal dulu
function tryLocalFirst() {
  const { localAddress, publicAddress } = config;

  return new Promise((resolve) => {
    const req = http.get(`${localAddress}/ping.php`, (res) => {
      if (res.statusCode === 200) {
        resolve(localAddress);
      } else {
        resolve(publicAddress);
      }
    });

    req.on("error", () => resolve(publicAddress));

    req.setTimeout(2000, () => {
      req.destroy();
      resolve(publicAddress);
    });
  });
}

// Fungsi membuat window baru
const createWindow = async () => {
  const urlToLoad = await tryLocalFirst();
  // Random session agar selalu unik
  const tempSession = session.fromPartition(`temp:${Math.random()}`);

  const splash = new BrowserWindow({
    width: 120,
    height: 200,
    frame: false,
    alwaysOnTop: true,
    transparent: true,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  splash.loadFile(path.join(__dirname, "splash.html"));

  const win = new BrowserWindow({
    width: 1000,
    height: 600,
    show: false,
    autoHideMenuBar: true,
    titleBarStyle: "hidden",
    titleBarOverlay: {
      color: "#ffffff",
      symbolColor: "#212529",
    },
    webPreferences: {
      session: tempSession,
      contextIsolation: true,
      nodeIntegration: false,
    },
    icon: path.join(__dirname, "../assets/favicon.ico"), // icon untuk window
  });

  win.loadURL(urlToLoad);
  console.log(urlToLoad, "loaded");

  // Tangani F5 (Refresh)
  win.webContents.on("before-input-event", (event, input) => {
    if (input.key === "F5" && !input.control && !input.alt && !input.shift) {
      win.webContents.reload();
      event.preventDefault();
    }
  });

  // Event saat selesai load halaman
  win.webContents.once("did-finish-load", () => {
    setTimeout(function () {
      splash.destroy(); // tutup splash
      win.show(); // tampilkan main window
      if (config.autoMaximize) win.maximize();
    }, 1000);
  });
};

// Pastikan hanya satu instance yang berjalan
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit(); // Jika tidak dapat lock, artinya instance sudah ada
} else {
  app.on("second-instance", async () => {
    // Aplikasi dibuka lagi → buat window baru
    createWindow();
  });

  app.whenReady().then(() => {
    ipcMain.handle("ping", () => "pong");
    ipcMain.handle("config", () => config);

    createWindow(); // Buka window pertama
  });

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
  });
}
