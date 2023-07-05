import { ProtectedAuth, ProtectedRoute } from './components/routes'
import { AuthLayout, Dialog, MainLayout } from './components'
import { Login, Register, Home, Create, Profile, Update, Detail } from './pages'
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
      <Dialog />
      <Routes>
        <Route element={<ProtectedAuth />}>
          <Route path="/" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Route>

        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path=":postId" element={<Detail />} />
          <Route element={<ProtectedRoute />}>
            <Route path="create" element={<Create />} />
            <Route path="update/:postId" element={<Update />} />
            <Route path="user/:id" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
