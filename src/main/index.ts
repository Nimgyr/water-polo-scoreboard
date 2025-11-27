import { app, shell, BrowserWindow, ipcMain, screen } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { AnyAction } from '@reduxjs/toolkit'
import icon from '../../resources/icon.png?asset'
import { store } from './store'
import type { RootState } from '../renderer/src/shared/state'

type WindowKind = 'primary' | 'secondary'

let secondaryWindow: BrowserWindow | null = null

const getExternalDisplayBounds = (): Electron.Rectangle | null => {
  const displays = screen.getAllDisplays()
  if (displays.length <= 1) {
    return null
  }
  const primaryId = screen.getPrimaryDisplay().id
  const externalDisplay = displays.find((display) => display.id !== primaryId)
  return externalDisplay?.bounds ?? null
}

const placeWindowOnExternalDisplay = (window: BrowserWindow): void => {
  const bounds = getExternalDisplayBounds()
  if (bounds) {
    window.setBounds(bounds)
  }
}

const showSecondaryWindowFullscreen = (window: BrowserWindow): void => {
  placeWindowOnExternalDisplay(window)
  window.setFullScreen(true)
  if (!window.isVisible()) {
    window.show()
  }
  window.focus()
}

const loadRenderer = (window: BrowserWindow, kind: WindowKind): void => {
  const query = `window=${kind}`
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    window.loadURL(`${process.env['ELECTRON_RENDERER_URL']}?${query}`)
  } else {
    window.loadFile(join(__dirname, '../renderer/index.html'), {
      query: { window: kind }
    })
  }
}

const createAppWindow = (kind: WindowKind): BrowserWindow => {
  const appWindow = new BrowserWindow({
    width: kind === 'primary' ? 900 : 640,
    height: kind === 'primary' ? 670 : 480,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  appWindow.on('ready-to-show', () => {
    appWindow.show()
  })

  appWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  appWindow.on('closed', () => {
    if (kind === 'secondary') {
      secondaryWindow = null
    }
  })

  loadRenderer(appWindow, kind)
  return appWindow
}

const getOrCreateSecondaryWindow = (): BrowserWindow => {
  if (secondaryWindow && !secondaryWindow.isDestroyed()) {
    if (!secondaryWindow.isVisible()) {
      secondaryWindow.show()
    }
    secondaryWindow.focus()
    return secondaryWindow
  }

  secondaryWindow = createAppWindow('secondary')
  return secondaryWindow
}

const broadcastState = (state: RootState): void => {
  BrowserWindow.getAllWindows().forEach((window) => {
    window.webContents.send('shared-store:state', state)
  })
}

const registerSharedStoreBridge = (): void => {
  store.subscribe(() => {
    broadcastState(store.getState())
  })
  broadcastState(store.getState())

  ipcMain.handle('shared-store:get-state', () => store.getState())
  ipcMain.handle('shared-store:dispatch', (_event, action: AnyAction) => {
    store.dispatch(action)
  })
}

const registerWindowIpc = (): void => {
  ipcMain.handle('window:open-secondary', () => {
    const window = getOrCreateSecondaryWindow()
    showSecondaryWindowFullscreen(window)
  })

  ipcMain.handle('window:close-secondary', () => {
    if (secondaryWindow && !secondaryWindow.isDestroyed()) {
      secondaryWindow.close()
    }
  })

  ipcMain.handle('window:toggle-secondary-fullscreen', () => {
    if (!secondaryWindow || secondaryWindow.isDestroyed()) {
      return
    }

    const shouldEnterFullscreen = !secondaryWindow.isFullScreen()
    if (shouldEnterFullscreen) {
      showSecondaryWindowFullscreen(secondaryWindow)
      return
    }

    secondaryWindow.setFullScreen(false)
    secondaryWindow.center()
    secondaryWindow.focus()
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  registerSharedStoreBridge()
  registerWindowIpc()

  createAppWindow('primary')

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createAppWindow('primary')
    }
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
