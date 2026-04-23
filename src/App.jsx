import React from 'react'
import { BrowserRouter } from 'react-router'
import PortalRoutes from './features/router/PortalRoutes'

function App() {
  return (
    <BrowserRouter>
      <PortalRoutes />
    </BrowserRouter>
  )
}

export default App