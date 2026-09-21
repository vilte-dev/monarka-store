import { Navigate } from 'react-router-dom'
import PageLoader from '@/components/ui/PageLoader.jsx'
import { useAuth } from './useAuth.js'

/** Envuelve una ruta que exige sesión; si no hay, redirige a /login. */
export default function ProtectedRoute({ children }) {
  const { session, loading } = useAuth()

  if (loading) {
    return <PageLoader message="Verificando sesion..." />
  }

  if (!session) {
    return <Navigate to="/login" replace />
  }

  return children
}
