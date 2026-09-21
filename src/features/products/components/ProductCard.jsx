import { formatPrice } from '@/utils/format.js'
import { FALLBACK_IMAGE_URL } from '../constants.js'
import ColorSwatches from './ColorSwatches.jsx'

export default function ProductCard({ product, onViewDetail }) {
  const { name, price, image_url, is_new, colors } = product

  return (
    <article className="product-card">
      <div className="product-media">
        {is_new && <span className="badge-new">Nuevo</span>}
        <img src={image_url || FALLBACK_IMAGE_URL} alt={name} loading="lazy" />
      </div>
      <div className="product-info">
        <p className="p-name">{name}</p>
        <p className="p-price">{formatPrice(price)}</p>
        <ColorSwatches colors={colors} />
        <button
          type="button"
          className="btn btn-outline btn-detail"
          onClick={() => onViewDetail?.(product)}
        >
          Ver detalle
        </button>
      </div>
    </article>
  )
}
