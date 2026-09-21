import { createContext } from 'react'

/** Contexto de la bolsa. Se provee en CartProvider y se consume con useCart(). */
export const CartContext = createContext(null)
