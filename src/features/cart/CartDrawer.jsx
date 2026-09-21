import Modal from '@/components/ui/Modal.jsx'
import { WhatsappIcon } from '@/components/ui/Icons.jsx'
import { buildWhatsappLink } from '@/config/site.js'
import { formatPrice } from '@/utils/format.js'
import CartLine from './CartLine.jsx'
import { buildOrderMessage } from './cartModel.js'
import { useCart } from './useCart.js'

/**
 * Panel lateral de la bolsa. Se monta una sola vez (en App) y se muestra
 * cuando `isOpen` es true. El pedido se cierra por WhatsApp: no hay pasarela de pago.
 */
export default function CartDrawer() {
  const { isOpen, items, count, subtotal, setQuantity, removeItem, clear, closeCart } = useCart()

  if (!isOpen) return null

  return (
    <Modal
      className="cart-drawer"
      overlayClassName="cart-overlay"
      onClose={closeCart}
      label="Tu bolsa"
    >
      <h3 className="cart-title">
        Tu bolsa{count > 0 && <span className="cart-title-count">({count})</span>}
      </h3>

      {items.length === 0 ? (
        <div className="cart-empty">
          <p>Tu bolsa esta vacia.</p>
          <button type="button" className="btn btn-outline" onClick={closeCart}>
            Seguir comprando
          </button>
        </div>
      ) : (
        <>
          <ul className="cart-lines">
            {items.map((line) => (
              <CartLine
                key={line.lineId}
                line={line}
                onQuantityChange={setQuantity}
                onRemove={removeItem}
              />
            ))}
          </ul>

          <div className="cart-footer">
            <div className="cart-total">
              <span>Total</span>
              <strong>{formatPrice(subtotal)}</strong>
            </div>
            <p className="cart-note">
              El pago y el envio se coordinan por WhatsApp al confirmar tu pedido.
            </p>
            <a
              href={buildWhatsappLink(buildOrderMessage(items))}
              target="_blank"
              rel="noreferrer"
              className="btn btn-whatsapp"
            >
              <WhatsappIcon />
              Finalizar pedido por WhatsApp
            </a>
            <button type="button" className="cart-clear" onClick={clear}>
              Vaciar bolsa
            </button>
          </div>
        </>
      )}
    </Modal>
  )
}
