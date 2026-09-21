import { Link, useNavigate } from 'react-router-dom'
import Logo from '@/components/ui/Logo.jsx'
import { signOut } from '@/features/auth/api.js'
import { useAuth } from '@/features/auth/useAuth.js'

export default function AdminHeader() {
  const { session } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    await signOut()
    navigate('/login', { replace: true })
  }

  return (
    <div className="admin-head">
      <Link to="/" className="logo-block">
        <Logo size={30} />
        <div className="logo-text" style={{ alignItems: 'flex-start' }}>
          <span className="word" style={{ fontSize: 18 }}>
            MONARKA
          </span>
          <span className="tag">Panel de catalogo</span>
        </div>
      </Link>
      <div className="admin-head-actions">
        {session?.user?.email && <span className="admin-user">{session.user.email}</span>}
        <Link to="/" className="btn btn-outline">
          Ver tienda
        </Link>
        <button type="button" className="btn btn-danger" onClick={handleLogout}>
          Cerrar sesion
        </button>
      </div>
    </div>
  )
}
