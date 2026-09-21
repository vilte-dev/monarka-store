import { useCallback, useState } from 'react'
import { EMPTY_FORM, productToForm } from './productFormModel.js'

/** Estado del formulario de producto (crear / editar). */
export function useProductForm() {
  const [form, setForm] = useState(EMPTY_FORM)

  const setField = useCallback((name, value) => {
    setForm((f) => ({ ...f, [name]: value }))
  }, [])

  const toggleSize = useCallback((size) => {
    setForm((f) => ({
      ...f,
      sizes: f.sizes.includes(size) ? f.sizes.filter((s) => s !== size) : [...f.sizes, size]
    }))
  }, [])

  const reset = useCallback(() => setForm(EMPTY_FORM), [])
  const loadProduct = useCallback((product) => setForm(productToForm(product)), [])

  return { form, setField, toggleSize, reset, loadProduct }
}
