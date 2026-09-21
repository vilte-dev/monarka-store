// Lógica pura de la bolsa (sin React ni navegador): fácil de probar.
// Una "línea" es un producto + talla + color; si se agrega de nuevo, suma cantidad.

import { describeColor } from '@/utils/color.js'
import { formatPrice } from '@/utils/format.js'

export const CART_STORAGE_KEY = 'monarka:cart:v1'
export const MAX_QUANTITY_PER_LINE = 10

/** Identificador de la línea: el mismo producto en otra talla/color es otra línea. */
export function makeLineId(productId, size, color) {
  return [productId, size ?? '', color ?? ''].join('|')
}

/** Producto de la base de datos + variante elegida -> línea de la bolsa (sin cantidad). */
export function toCartLine(product, { size = null, color = null } = {}) {
  return {
    lineId: makeLineId(product.id, size, color),
    productId: product.id,
    name: product.name,
    price: Number(product.price) || 0,
    image_url: product.image_url || '',
    size,
    color
  }
}

function clampQuantity(quantity) {
  return Math.min(Math.max(Math.trunc(quantity) || 1, 1), MAX_QUANTITY_PER_LINE)
}

/** Reducer de la bolsa. Acciones: add, setQuantity, remove, clear. */
export function cartReducer(items, action) {
  switch (action.type) {
    case 'add': {
      const { line, quantity } = action
      const exists = items.some((item) => item.lineId === line.lineId)
      if (!exists) return [...items, { ...line, quantity: clampQuantity(quantity) }]
      return items.map((item) =>
        item.lineId === line.lineId
          ? { ...item, quantity: clampQuantity(item.quantity + quantity) }
          : item
      )
    }
    case 'setQuantity': {
      if (action.quantity < 1) return items.filter((item) => item.lineId !== action.lineId)
      return items.map((item) =>
        item.lineId === action.lineId ? { ...item, quantity: clampQuantity(action.quantity) } : item
      )
    }
    case 'remove':
      return items.filter((item) => item.lineId !== action.lineId)
    case 'clear':
      return []
    default:
      return items
  }
}

export function countItems(items) {
  return items.reduce((total, item) => total + item.quantity, 0)
}

export function cartSubtotal(items) {
  return items.reduce((total, item) => total + item.price * item.quantity, 0)
}

/** Descarta datos corruptos que pudieran venir de localStorage. */
export function isValidLine(line) {
  return (
    !!line &&
    typeof line.lineId === 'string' &&
    typeof line.name === 'string' &&
    Number.isFinite(line.price) &&
    Number.isInteger(line.quantity) &&
    line.quantity >= 1 &&
    line.quantity <= MAX_QUANTITY_PER_LINE
  )
}

/** Texto del pedido que se envía por WhatsApp. */
export function buildOrderMessage(items) {
  const lines = items.map((item, index) => {
    const details = [
      item.size && `Talla ${item.size}`,
      item.color && `Color ${describeColor(item.color)}`
    ].filter(Boolean)
    const title = [item.name, ...details].join(' - ')
    const lineTotal = formatPrice(item.price * item.quantity)
    const amount = `${item.quantity} x ${formatPrice(item.price)} = ${lineTotal}`
    return `${index + 1}. ${title}\n   ${amount}`
  })

  return [
    'Hola Monarka! Quisiera hacer este pedido:',
    '',
    ...lines,
    '',
    `Total: ${formatPrice(cartSubtotal(items))}`,
    'Quedo atento a la confirmacion de disponibilidad y envio.'
  ].join('\n')
}
