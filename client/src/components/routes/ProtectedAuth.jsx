import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const ProtectedAuth = ({ children }) => {
  const location = useLocation()
  const { userInfo } = useSelector((state) => state.auth)

  if (userInfo) {
    return <Navigate to="/home" replace state={{ from: location }} />
  }
  return children || <Outlet />
}

export default ProtectedAuth
