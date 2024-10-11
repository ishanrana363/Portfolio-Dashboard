import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { route } from './router/Router.jsx'

import "./assets/style.css"
import { HelmetProvider } from 'react-helmet-async'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <RouterProvider router={route} >
      </RouterProvider>
    </HelmetProvider>
  </StrictMode>,
)