import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthContextProvider } from './context/authContext'
import { GoogleOAuthProvider } from '@react-oauth/google'
import CONFIG from './config/environtment'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={CONFIG.googleClientId}>
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
)
