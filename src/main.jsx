import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {RouterProvider } from 'react-router-dom'
import { route } from './router/Router.jsx'

import "./assets/style.css"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={route} >
    
    </RouterProvider>
  </StrictMode>,
)
