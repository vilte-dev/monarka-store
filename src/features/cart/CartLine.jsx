import { CloseIcon } from '@/components/ui/Icons.jsx'
import { FALLBACK_IMAGE_URL } from '@/features/products/constants.js'
import { describeColor } from '@/utils/color.js'
import { formatPrice } from '@/utils/format.js'
import { MAX_QUANTITY_PER_LINE } from './cartModel.js'

/** Una fila de la bolsa: foto, variante, selector de cantidad y subtotal de la línea. */
export default function CartLine({ line, onQuantityChange, onRemove }) {
  const { lineId, name, price, image_url, size, color, quantity } = line

  return (
    <li className="cart-line">
      <img className="cart-line-img" src={image_url || FALLBACK_IMAGE_URL} alt={name} />

      <div className="cart-line-body">
        <p className="cart-line-name">{name}</p>
        {(size || color) && (
          <p className="cart-line-meta">
            {size && <span>Talla {size}</span>}
            {color && (
              <span className="cart-line-color">
                <span className="swatch" style={{ background: color }} />
                {describeColor(color)}
              </span>
            )}
          </p>
        )}

        <div className="cart-line-row">
          <div className="qty" role="group" aria-label={`Cantidad de ${name}`}>
            <button
              type="button"
              onClick={() => onQuantityChange(lineId, quantity - 1)}
              disabled={quantity <= 1}
              aria-label="Quitar una unidad"
            >
              −
            </button>
            <span aria-live="polite">{quantity}</span>
            <button
              type="button"
              onClick={() => onQuantityChange(lineId, quantity + 1)}
              disabled={quantity >= MAX_QUANTITY_PER_LINE}
              aria-label="Agregar una unidad"
            >
              +
            </button>
          </div>
          <span className="cart-line-price">{formatPrice(price * quantity)}</span>
        </div>
      </div>

      <button
        type="button"
        className="cart-line-remove"
        onClick={() => onRemove(lineId)}
        aria-label={`Quitar ${name} de la bolsa`}
      >
        <CloseIcon />
      </button>
    </li>
  )
}
