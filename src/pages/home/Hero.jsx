import { SITE } from '@/config/site.js'

const HERO_IMAGE_URL =
  'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop'

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg" style={{ backgroundImage: `url('${HERO_IMAGE_URL}')` }} />
      <div className="hero-overlay" />
      <div className="wrap">
        <div className="hero-content">
          <span className="eyebrow">{`Nueva coleccion — ${SITE.location}`}</span>
          <h1>Ropa de calidad, hecha para durar</h1>
          <p>
            Descubre las piezas Monarka de la temporada: cortes limpios, materiales resistentes y un
            estilo que no pasa de moda.
          </p>
          <a href="#catalogo" className="btn">
            Ver catalogo
          </a>
        </div>
      </div>
    </section>
  )
}
