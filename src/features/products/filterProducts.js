import { ALL_CATEGORY, SORT } from './constants.js'

/**
 * Función pura: aplica categoría, búsqueda, talla, color y orden a la lista de productos.
 * No modifica el arreglo original.
 */
export function filterProducts(products, { search, category, size, color, sort }) {
  let list = [...products]

  if (category !== ALL_CATEGORY) {
    list = list.filter((p) => (p.category || '').toLowerCase() === category.toLowerCase())
  }

  if (search.trim()) {
    const q = search.trim().toLowerCase()
    list = list.filter(
      (p) =>
        p.name?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q)
    )
  }

  if (size) {
    list = list.filter((p) => (p.sizes || []).includes(size))
  }

  if (color) {
    list = list.filter((p) => (p.colors || []).includes(color))
  }

  if (sort === SORT.PRICE_ASC) list.sort((a, b) => a.price - b.price)
  if (sort === SORT.PRICE_DESC) list.sort((a, b) => b.price - a.price)
  if (sort === SORT.NEWEST) list.sort((a, b) => Number(b.is_new) - Number(a.is_new))

  return list
}

/** Colores únicos presentes en el catálogo (para el filtro de color). */
export function collectColors(products) {
  const set = new Set()
  products.forEach((p) => (p.colors || []).forEach((c) => set.add(c)))
  return Array.from(set)
}
