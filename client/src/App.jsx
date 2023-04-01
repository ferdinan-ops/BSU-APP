import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { Login, Register } from './pages'
import Home from './pages/Home'
import { ProtectedAuth, ProtectedRoute } from './components'

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
