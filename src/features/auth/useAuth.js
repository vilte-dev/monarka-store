import { useContext } from 'react'
import { AuthContext } from './AuthContext.js'

/** Devuelve { session, loading }. Debe usarse dentro de <AuthProvider>. */
export function useAuth() {
  return useContext(AuthContext)
}
