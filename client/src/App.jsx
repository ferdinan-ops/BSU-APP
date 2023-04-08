import { ProtectedAuth, ProtectedRoute } from './components/routes'
import { AuthLayout, MainLayout } from './components/common'
import { Login, Register, Home, Create } from './components/pages'
import { Route, Routes } from 'react-router-dom'
import localization from 'moment/locale/id'
import { Toaster } from 'react-hot-toast'
import moment from 'moment'

const App = () => {
  moment.updateLocale('id', localization)

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
            <Route path="create" element={<Create />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
