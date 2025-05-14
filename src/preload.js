const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  test: () => "TEST from preload.js",
  ping: () => ipcRenderer.invoke('ping'),
  config: () => ipcRenderer.invoke('config')
});
