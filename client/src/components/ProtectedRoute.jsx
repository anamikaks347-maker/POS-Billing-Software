import { Navigate, Outlet } from 'react-router-dom'

function ProtectedRoute() {
    const token = localStorage.getItem('adminToken')

    console.log('Admin Token:', token)

    if (!token) {
        return <Navigate to="/login" replace />
    }

    return <Outlet />
}

export default ProtectedRoute