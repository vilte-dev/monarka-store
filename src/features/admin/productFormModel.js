// Modelo del formulario de producto: convierte entre el producto de la base de datos
// y los valores del formulario (los colores se escriben como texto separado por comas).

import { DEFAULT_CATEGORY } from '@/features/products/constants.js'

export const EMPTY_FORM = {
  id: null,
  name: '',
  price: '',
  category: DEFAULT_CATEGORY,
  sizes: [],
  colors: '',
  image_url: '',
  is_new: false,
  stock: '',
  description: ''
}

/** Producto de la base de datos -> valores del formulario (para editar). */
export function productToForm(product) {
  return {
    id: product.id,
    name: product.name || '',
    price: product.price ?? '',
    category: product.category || DEFAULT_CATEGORY,
    sizes: product.sizes || [],
    colors: (product.colors || []).join(', '),
    image_url: product.image_url || '',
    is_new: !!product.is_new,
    stock: product.stock ?? '',
    description: product.description || ''
  }
}

/** Valores del formulario -> objeto listo para insertar/actualizar en Supabase. */
export function formToPayload(form) {
  return {
    name: form.name,
    price: Number(form.price) || 0,
    category: form.category,
    sizes: form.sizes,
    colors: form.colors
      .split(',')
      .map((c) => c.trim())
      .filter(Boolean),
    image_url: form.image_url,
    is_new: form.is_new,
    stock: Number(form.stock) || 0,
    description: form.description
  }
}
