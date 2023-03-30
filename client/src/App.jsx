import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { Login, Register } from './pages'

const App = () => {
  return (
    <>
      <div>
        <Toaster />
      </div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  )
}

export default App
