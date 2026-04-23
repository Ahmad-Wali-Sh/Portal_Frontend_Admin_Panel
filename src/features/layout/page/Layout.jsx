import React from 'react'

function Layout({children}) {
  return (
    <div>
        <h1>Header</h1>
        <h2>Sidebar</h2>
        <p>{children}</p>
    </div>
  )
}

export default Layout