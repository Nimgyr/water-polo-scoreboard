import './assets/main.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { initializeSharedStore } from './store/useSharedStore'

const container = document.getElementById('root')

const bootstrap = async (): Promise<void> => {
  if (!container) {
    throw new Error('Failed to find root container')
  }

  await initializeSharedStore()

  createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>
  )
}

bootstrap().catch((error) => {
  console.error('Failed to bootstrap renderer', error)
})
