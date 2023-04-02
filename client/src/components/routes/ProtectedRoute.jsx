import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const location = useLocation()
  const { userInfo } = useSelector((state) => state.auth)

  if (!userInfo) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }
  return children || <Outlet />
}

export default ProtectedRoute
