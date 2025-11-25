import { contextBridge, ipcRenderer } from 'electron'
import type { IpcRendererEvent } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import type { AnyAction } from '@reduxjs/toolkit'
import type { RootState } from '../shared/state'

// Custom APIs for renderer
const api = {}

type StoreListener = (state: RootState) => void

const sharedStoreBridge = {
  dispatch: (action: AnyAction): Promise<void> =>
    ipcRenderer.invoke('shared-store:dispatch', action),
  getState: (): Promise<RootState> => ipcRenderer.invoke('shared-store:get-state'),
  onStateChange: (listener: StoreListener): (() => void) => {
    const channel = 'shared-store:state'
    const handler = (_event: IpcRendererEvent, state: RootState): void => listener(state)
    ipcRenderer.on(channel, handler)
    return () => {
      ipcRenderer.removeListener(channel, handler)
    }
  }
}

const windowControls = {
  openSecondaryWindow: (): Promise<void> => ipcRenderer.invoke('window:open-secondary'),
  closeSecondaryWindow: (): Promise<void> => ipcRenderer.invoke('window:close-secondary'),
  toggleSecondaryFullscreen: (): Promise<void> =>
    ipcRenderer.invoke('window:toggle-secondary-fullscreen')
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    contextBridge.exposeInMainWorld('sharedStore', sharedStoreBridge)
    contextBridge.exposeInMainWorld('windowControls', windowControls)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
  // @ts-ignore (define in dts)
  window.sharedStore = sharedStoreBridge
  // @ts-ignore (define in dts)
  window.windowControls = windowControls
}
