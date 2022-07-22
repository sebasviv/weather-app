import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/autchContext'
import LoadingComponent from '../utils/loading/LoadingComponent'

export function ProtectedRoute({ children }: any) {
    const { user, loading } = useAuth()
    if (loading) {
        return <LoadingComponent/>
    }

    if (!user) {
        return <Navigate to='/login'></Navigate>
    }

    return <>{children}</>
}