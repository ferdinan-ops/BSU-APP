import { ProtectedAuth, ProtectedRoute } from './components/routes'
import { AuthLayout, Dialog, MainLayout, UserLayout } from './components'
import {
  Login,
  Register,
  Home,
  Create,
  User,
  Update,
  Detail,
  UserSave,
  UserLike,
  Notification,
  NotFound
} from './pages'
import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

const App = () => {
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
          <Route path="*" element={<NotFound />} />
          <Route path="/404" element={<NotFound />} />
          <Route index element={<Home />} />
          <Route path=":postId" element={<Detail />} />
          <Route element={<ProtectedRoute />}>
            <Route path="create" element={<Create />} />
            <Route path="update/:postId" element={<Update />} />
            <Route path="notification" element={<Notification />} />
            <Route path="user/:userId" element={<UserLayout />}>
              <Route index element={<User />} />
              <Route path="save" element={<UserSave />} />
              <Route path="like" element={<UserLike />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
