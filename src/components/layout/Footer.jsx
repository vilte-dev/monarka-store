import Logo from '@/components/ui/Logo.jsx'
import {
  WhatsappIcon,
  FacebookIcon,
  InstagramIcon,
  TiktokIcon,
  SearchIcon
} from '@/components/ui/Icons.jsx'
import { SITE, SOCIAL_LINKS, WHATSAPP_URL } from '@/config/site.js'
import { PRODUCT_CATEGORIES } from '@/features/products/constants.js'

const SOCIALS = [
  { label: 'WhatsApp', href: WHATSAPP_URL, Icon: WhatsappIcon },
  { label: 'Facebook', href: SOCIAL_LINKS.facebook, Icon: FacebookIcon },
  { label: 'Instagram', href: SOCIAL_LINKS.instagram, Icon: InstagramIcon },
  { label: 'TikTok', href: SOCIAL_LINKS.tiktok, Icon: TiktokIcon }
]

export default function Footer({ onSearchChange, onOpenFaq }) {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-col footer-brand">
            <div className="logo-block" style={{ justifyContent: 'flex-start' }}>
              <Logo size={34} color="#F6F2EA" />
              <div className="logo-text" style={{ alignItems: 'flex-start' }}>
                <span className="word">{SITE.name}</span>
                <span className="tag">{SITE.tagline}</span>
              </div>
            </div>
            <p>
              {`Prendas pensadas para el dia a dia: calidad, comodidad y estilo en cada coleccion. Envios en ${SITE.location}.`}
            </p>
            <div className="social-row">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  className="social-btn"
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          <div className="footer-col">
            <h4>Categorias</h4>
            <ul>
              {PRODUCT_CATEGORIES.map((cat) => (
                <li key={cat}>
                  <a href="#catalogo">{cat}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>Ayuda</h4>
            <ul>
              <li>
                <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                  Servicio al cliente
                </a>
              </li>
              <li>
                <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                  Cambios y devoluciones
                </a>
              </li>
              <li>
                <a href="#catalogo">Guia de tallas</a>
              </li>
              <li>
                <button type="button" className="footer-link-btn" onClick={onOpenFaq}>
                  Preguntas frecuentes
                </button>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Buscar en Monarka</h4>
            <div className="search-box" style={{ marginBottom: 20 }}>
              <input
                type="text"
                placeholder="Buscar productos..."
                onChange={(e) => onSearchChange?.(e.target.value)}
                aria-label="Buscar en el footer"
              />
              <SearchIcon />
            </div>
          </div>
        </div>

        <div className="rule-thin" />

        <div className="footer-bottom">
          <span>{`© ${new Date().getFullYear()} Monarka. Todos los derechos reservados.`}</span>
          <span>{`${SITE.location} — Ropa de calidad, hecha para durar.`}</span>
        </div>
      </div>
    </footer>
  )
}
