import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthContextProvider } from './context/authContext'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Provider } from 'react-redux'
import CONFIG from './constants/environtment'
import { store } from './store/store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={CONFIG.googleClientId}>
        <AuthContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/*" element={<App />} />
            </Routes>
          </BrowserRouter>
        </AuthContextProvider>
      </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>
)
