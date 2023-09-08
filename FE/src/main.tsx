import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConfigProvider } from 'antd'
import { StyleProvider } from '@ant-design/cssinjs'
import { BrowserRouter } from 'react-router-dom'
// import ColorModeContextProvider from './contexts/colorMode'
import App from './App'
import './index.css'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.Suspense>
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={{ token: { fontFamily: 'Inter, Roboto, sans-serif' } }}>
        <StyleProvider hashPriority='high'>
          {/* <ColorModeContextProvider> */}
          <BrowserRouter>
            <App />
          </BrowserRouter>
          {/* </ColorModeContextProvider> */}
        </StyleProvider>
      </ConfigProvider>
    </QueryClientProvider>
  </React.Suspense>,
)
