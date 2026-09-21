import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import Logo from '@/components/ui/Logo.jsx'
import { signIn } from '@/features/auth/api.js'
import { useAuth } from '@/features/auth/useAuth.js'

export default function LoginPage() {
  const { session, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  if (!loading && session) {
    const redirectTo = location.state?.from || '/admin'
    return <Navigate to={redirectTo} replace />
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      await signIn(email, password)
    } catch (err) {
      setError(
        err.message === 'Invalid login credentials'
          ? 'Correo o contraseña incorrectos.'
          : err.message
      )
      setSubmitting(false)
      return
    }

    navigate('/admin', { replace: true })
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <Link to="/" className="auth-back-link">
          ← Volver al inicio
        </Link>

        <div className="logo-block" style={{ marginBottom: 22 }}>
          <Logo size={38} />
          <div className="logo-text">
            <span className="word">MONARKA</span>
            <span className="tag">Panel de catalogo</span>
          </div>
        </div>

        <h3 className="auth-title">Iniciar sesion</h3>
        <p className="auth-subtitle">Acceso exclusivo para el equipo de Monarka.</p>

        {error && <div className="status-banner error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="email">Correo</label>
            <input
              id="email"
              type="email"
              required
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tucorreo@monarka.com"
            />
          </div>

          <div className="field">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <button className="btn" type="submit" disabled={submitting} style={{ width: '100%' }}>
            {submitting ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>

        <p className="admin-note" style={{ marginTop: 18 }}>
          Los usuarios se crean desde Supabase: Authentication → Users → Add user.
        </p>
      </div>
    </div>
  )
}
