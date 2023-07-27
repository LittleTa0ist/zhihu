import React from 'react'
import RouterView from './router'
import { HashRouter } from 'react-router-dom'
import { KeepAliveProvider } from 'keepalive-react-component'
export default function App() {
  return (
    <HashRouter>
      <KeepAliveProvider>
        <RouterView />
      </KeepAliveProvider>
    </HashRouter>
  )
}
