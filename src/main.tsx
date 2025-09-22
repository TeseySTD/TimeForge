import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import ThemeProvider from './contexts/ThemeProvider'
import ToastProvider from './contexts/ToastProvider.tsx'
import { SoundProvider } from './contexts/SoundProvider.tsx'
import { RouterProvider } from 'react-router'
import router from './routes.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <SoundProvider>
        <ToastProvider>
          <RouterProvider router={router} />
         </ToastProvider>
      </SoundProvider>
    </ThemeProvider>
  </StrictMode>,
)
