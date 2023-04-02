import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { Login, Register, Home } from './components/pages'
import { ProtectedAuth, ProtectedRoute } from './components/routes'

const App = () => {
  return (
    <>
      <div>
        <Toaster />
      </div>
      <Routes>
        <Route element={<ProtectedAuth />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
