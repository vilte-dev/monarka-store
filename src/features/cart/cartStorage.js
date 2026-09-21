// Persistencia de la bolsa en localStorage, para que sobreviva a recargar la página.

import { CART_STORAGE_KEY, isValidLine } from './cartModel.js'

/** Lee la bolsa guardada. Si no hay nada o los datos están dañados, devuelve una bolsa vacía. */
export function loadCart() {
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.filter(isValidLine) : []
  } catch {
    return []
  }
}

export function saveCart(items) {
  try {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  } catch {
    // Modo privado o almacenamiento lleno: la bolsa sigue funcionando en memoria.
  }
}
