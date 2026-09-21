import { createContext } from 'react'

/** Contexto de sesión. Se provee en AuthProvider y se consume con useAuth(). */
export const AuthContext = createContext({ session: null, loading: true })
