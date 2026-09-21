// Constantes del dominio "productos". Categorías, tallas y orden se definen UNA sola vez aquí.

export const PRODUCT_CATEGORIES = ['Mujer', 'Hombre', 'Accesorios', 'Ofertas']

/** Categoría preseleccionada al crear un producto en el panel. */
export const DEFAULT_CATEGORY = PRODUCT_CATEGORIES[0]

/** Opción "sin filtro" del menú de categorías (no es una categoría real de la base de datos). */
export const ALL_CATEGORY = 'Todo'

export const NAV_CATEGORIES = [ALL_CATEGORY, ...PRODUCT_CATEGORIES]

export const PRODUCT_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

export const SORT = {
  RELEVANCE: 'relevancia',
  PRICE_ASC: 'precio-asc',
  PRICE_DESC: 'precio-desc',
  NEWEST: 'nuevo'
}

export const SORT_OPTIONS = [
  { value: SORT.RELEVANCE, label: 'Relevancia' },
  { value: SORT.PRICE_ASC, label: 'Precio: menor a mayor' },
  { value: SORT.PRICE_DESC, label: 'Precio: mayor a menor' },
  { value: SORT.NEWEST, label: 'Nuevos primero' }
]

/** Imagen mostrada cuando un producto no tiene image_url. */
export const FALLBACK_IMAGE_URL =
  'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=800&auto=format&fit=crop'
