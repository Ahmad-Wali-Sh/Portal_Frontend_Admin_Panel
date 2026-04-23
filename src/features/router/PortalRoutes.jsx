import React from 'react'
import { Routes, Route } from 'react-router'
import routes from './routes'
import Layout from '../layout/page/Layout'

function PortalRoutes() {
  return (
    <Routes>
      {routes.map((route) => (
        route.layout 
          ?
          <Route element={<Layout>{route.element}</Layout>} path={route.path} />
          :
          <Route element={route.element} path={route.path} />
      ))}
    </Routes>
  )
}

export default PortalRoutes