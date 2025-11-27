import { ElectronAPI } from '@electron-toolkit/preload'
import type { AnyAction } from '@reduxjs/toolkit'
import type { RootState } from '../renderer/src/shared/state'

interface SharedStoreBridge {
  dispatch: (action: AnyAction) => Promise<void>
  getState: () => Promise<RootState>
  onStateChange: (listener: (state: RootState) => void) => () => void
}

interface WindowControlsAPI {
  openSecondaryWindow: () => Promise<void>
  closeSecondaryWindow: () => Promise<void>
  toggleSecondaryFullscreen: () => Promise<void>
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown
    sharedStore: SharedStoreBridge
    windowControls: WindowControlsAPI
  }
}

export {}
