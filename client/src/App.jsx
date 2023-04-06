import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { Login, Register, Home } from './components/pages'
import { ProtectedAuth, ProtectedRoute } from './components/routes'
import { AuthLayout, MainLayout } from './components/common'

const App = () => {
  return (
    <>
      <div>
        <Toaster />
      </div>
      <Routes>
        <Route element={<ProtectedAuth />}>
          <Route path="/" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
