import { useState } from 'react'
import Modal from '@/components/ui/Modal.jsx'
import { BagIcon, WhatsappIcon } from '@/components/ui/Icons.jsx'
import { buildWhatsappLink } from '@/config/site.js'
import { formatPrice } from '@/utils/format.js'
import { FALLBACK_IMAGE_URL } from '../constants.js'
import ColorSwatches from './ColorSwatches.jsx'

/**
 * Detalle del producto. El cliente elige talla y color (si el producto los tiene)
 * y llama a `onAddToBag(product, { size, color })`.
 */
export default function ProductModal({ product, onClose, onAddToBag }) {
  const { name, price, image_url, description, sizes, colors, category } = product

  // Si solo hay una opción, se deja elegida.
  const [size, setSize] = useState(() => (sizes?.length === 1 ? sizes[0] : null))
  const [color, setColor] = useState(() => (colors?.length === 1 ? colors[0] : null))
  const [triedToAdd, setTriedToAdd] = useState(false)

  const missingSize = sizes?.length > 0 && !size
  const missingColor = colors?.length > 0 && !color

  function handleAdd() {
    if (missingSize || missingColor) {
      setTriedToAdd(true)
      return
    }
    onAddToBag(product, { size, color })
  }

  const whatsappUrl = buildWhatsappLink(
    `Hola Monarka! Me interesa el producto "${name}" (${formatPrice(price)}). Quisiera mas informacion.`
  )

  return (
    <Modal className="product-modal" onClose={onClose} label={name}>
      <div className="product-modal-media">
        <img src={image_url || FALLBACK_IMAGE_URL} alt={name} />
      </div>

      <div className="product-modal-info">
        {category && <span className="eyebrow">{category}</span>}
        <h3>{name}</h3>
        <p className="p-price">{formatPrice(price)}</p>

        {colors?.length > 0 && (
          <div className="modal-attr">
            <span className="modal-attr-label">Colores</span>
            <ColorSwatches colors={colors} selected={color} onSelect={setColor} />
            {triedToAdd && missingColor && (
              <p className="modal-error" role="alert">
                Elige un color.
              </p>
            )}
          </div>
        )}

        {sizes?.length > 0 && (
          <div className="modal-attr">
            <span className="modal-attr-label">Tallas</span>
            <div className="modal-sizes">
              {sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  className={`size-pill ${size === s ? 'active' : ''}`.trim()}
                  onClick={() => setSize(s)}
                  aria-pressed={size === s}
                >
                  {s}
                </button>
              ))}
            </div>
            {triedToAdd && missingSize && (
              <p className="modal-error" role="alert">
                Elige una talla.
              </p>
            )}
          </div>
        )}

        <div className="modal-attr">
          <span className="modal-attr-label">Descripcion</span>
          <p className="product-modal-desc">
            {description || 'Sin descripcion disponible para este producto.'}
          </p>
        </div>

        <button type="button" className="btn btn-add" onClick={handleAdd}>
          <BagIcon width="18" height="18" />
          Agregar a la bolsa
        </button>

        <a href={whatsappUrl} target="_blank" rel="noreferrer" className="btn btn-whatsapp">
          <WhatsappIcon />
          Contactar al vendedor por WhatsApp
        </a>
      </div>
    </Modal>
  )
}
