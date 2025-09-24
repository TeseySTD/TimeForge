import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import ThemeProvider from './contexts/ThemeProvider'
import ToastProvider from './contexts/ToastProvider.tsx'
import { SoundProvider } from './contexts/SoundProvider.tsx'
import { RouterProvider } from 'react-router'
import router from './routes.ts'
import { TimersProvider } from './contexts/TimersProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <SoundProvider>
        <ToastProvider>
          <TimersProvider>
            <RouterProvider router={router} />
          </TimersProvider>
        </ToastProvider>
      </SoundProvider>
    </ThemeProvider>
  </StrictMode>,
)
