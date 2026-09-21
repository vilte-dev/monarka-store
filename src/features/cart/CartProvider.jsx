import { useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import { CartContext } from './CartContext.js'
import { cartReducer, cartSubtotal, countItems, toCartLine } from './cartModel.js'
import { loadCart, saveCart } from './cartStorage.js'

export default function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, undefined, loadCart)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    saveCart(items)
  }, [items])

  const addItem = useCallback(
    (product, { size = null, color = null, quantity = 1 } = {}) =>
      dispatch({ type: 'add', line: toCartLine(product, { size, color }), quantity }),
    []
  )
  const setQuantity = useCallback(
    (lineId, quantity) => dispatch({ type: 'setQuantity', lineId, quantity }),
    []
  )
  const removeItem = useCallback((lineId) => dispatch({ type: 'remove', lineId }), [])
  const clear = useCallback(() => dispatch({ type: 'clear' }), [])
  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])

  const value = useMemo(
    () => ({
      items,
      count: countItems(items),
      subtotal: cartSubtotal(items),
      isOpen,
      addItem,
      setQuantity,
      removeItem,
      clear,
      openCart,
      closeCart
    }),
    [items, isOpen, addItem, setQuantity, removeItem, clear, openCart, closeCart]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
