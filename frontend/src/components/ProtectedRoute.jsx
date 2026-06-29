import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children, adminOnly = false }) {
  const token = localStorage.getItem('authToken')
  const currentUser = JSON.parse(localStorage.getItem('authUser') || 'null')

  if (!token) {
    return <Navigate to="/login" replace />
  }

  if (adminOnly && currentUser?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />
  }

  return children
}

export default ProtectedRoute
