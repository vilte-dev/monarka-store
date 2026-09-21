import { useContext } from 'react'
import { CartContext } from './CartContext.js'

/**
 * Devuelve { items, count, subtotal, isOpen, addItem, setQuantity, removeItem, clear,
 * openCart, closeCart }. Debe usarse dentro de <CartProvider>.
 */
export function useCart() {
  const value = useContext(CartContext)
  if (!value) throw new Error('useCart debe usarse dentro de <CartProvider>')
  return value
}
