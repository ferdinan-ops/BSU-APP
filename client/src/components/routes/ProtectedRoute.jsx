import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthContext } from '../../context/authContext'

const ProtectedRoute = ({ children }) => {
  const { userInfo } = useAuthContext()
  const location = useLocation()

  if (!userInfo) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }
  return children || <Outlet />
}

export default ProtectedRoute
