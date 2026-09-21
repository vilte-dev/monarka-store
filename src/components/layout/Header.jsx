import { Link } from 'react-router-dom'
import Logo from '@/components/ui/Logo.jsx'
import { SearchIcon, UserIcon, BagIcon } from '@/components/ui/Icons.jsx'
import { SITE, WHATSAPP_URL } from '@/config/site.js'
import { NAV_CATEGORIES } from '@/features/products/constants.js'

export default function Header({
  search,
  onSearchChange,
  activeCategory,
  onCategoryChange,
  bagCount = 0,
  onBagClick
}) {
  return (
    <>
      <div className="topbar">
        <div className="wrap">
          <span>{`Envios en ${SITE.location} — tu confianza es nuestra prioridad.`}</span>
          <div className="topbar-links">
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
              Escribenos por WhatsApp
            </a>
            <Link to="/admin">Panel</Link>
          </div>
        </div>
      </div>

      <header className="site-header">
        <div className="wrap header-inner">
          <div className="header-search">
            <div className="search-box">
              <input
                type="text"
                placeholder="Que estas buscando?"
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                aria-label="Buscar productos"
              />
              <SearchIcon />
            </div>
          </div>

          <Link to="/" className="logo-block">
            <Logo size={40} />
            <div className="logo-text">
              <span className="word">{SITE.name}</span>
              <span className="tag">{SITE.tagline}</span>
            </div>
          </Link>

          <div className="header-actions">
            <Link to="/admin" className="icon-btn">
              <UserIcon />
              <span>Panel</span>
            </Link>
            <button
              type="button"
              className="icon-btn bag-btn"
              onClick={onBagClick}
              aria-label={bagCount > 0 ? `Abrir bolsa (${bagCount})` : 'Abrir bolsa'}
            >
              <span className="bag-icon">
                <BagIcon />
                {bagCount > 0 && (
                  <span className="bag-badge" aria-hidden="true">
                    {bagCount}
                  </span>
                )}
              </span>
              <span>Bolsa</span>
            </button>
          </div>
        </div>
      </header>

      <nav className="category-nav">
        <div className="wrap">
          <ul>
            {NAV_CATEGORIES.map((cat) => (
              <li key={cat}>
                <button
                  className={activeCategory === cat ? 'active' : ''}
                  onClick={() => onCategoryChange(cat)}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  )
}
