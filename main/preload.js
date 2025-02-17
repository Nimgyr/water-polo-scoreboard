// eslint-disable-next-line @typescript-eslint/no-require-imports
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("preloadTest", {
    isConnected: () => "Preload is working!",
    get: (key) => ipcRenderer.invoke("get-store-data", key),
    set: (key, value) => ipcRenderer.invoke("set-store-data", key, value),
});
