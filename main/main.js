import { app, BrowserWindow, ipcMain } from "electron";
import Store from "electron-store";

import * as path from "path";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import serve from "electron-serve";
const appServe = app.isPackaged
    ? serve({
          directory: path.join(__dirname, "../out"),
      })
    : null;

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: false,
            preload: __dirname + "/preload.js",
        },
    });

    if (app.isPackaged) {
        appServe(win).then(() => {
            win.loadURL("app://-");
        });
    } else {
        win.loadURL("http://localhost:3000");
        win.webContents.openDevTools();
        win.webContents.on("did-fail-load", () => {
            win.webContents.reloadIgnoringCache();
        });
    }
};

app.on("ready", () => {
    createWindow();
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

const store = new Store({
    schema: {
        tournamentName: {
            type: "string",
            default: "game",
        },
        teams: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    id: { type: "number" },
                    name: { type: "string" },
                    shortName: { type: "string" },
                },
            },
        },
    },
});

ipcMain.handle("get-store-data", (event, key) => {
    return store.get(key);
});

ipcMain.handle("set-store-data", (event, key, value) => {
    store.set(key, value);
});
