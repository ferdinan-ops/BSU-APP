import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthContext } from '../../context/authContext'

const ProtectedAuth = ({ children }) => {
  const { userInfo } = useAuthContext()
  const location = useLocation()
  if (userInfo) {
    return <Navigate to="/home" replace state={{ from: location }} />
  }
  return children || <Outlet />
}

export default ProtectedAuth
