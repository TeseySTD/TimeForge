import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './app/App.tsx'
import ThemeProvider from './contexts/ThemeProvider'
import ToastProvider from './contexts/ToastProvider.tsx'
import { SoundProvider } from './contexts/SoundProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <SoundProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </SoundProvider>
    </ThemeProvider>
  </StrictMode>,
)
