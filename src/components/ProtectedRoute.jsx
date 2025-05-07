import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ isAuthenticated, children, redirectTo = "/login" }) => {
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
