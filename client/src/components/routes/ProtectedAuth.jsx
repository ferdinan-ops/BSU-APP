import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const ProtectedAuth = ({ children }) => {
  const location = useLocation()
  const user = useSelector((state) => state.auth.userInfo)

  if (user) return <Navigate to="/" replace state={{ from: location }} />
  return children || <Outlet />
}

export default ProtectedAuth
