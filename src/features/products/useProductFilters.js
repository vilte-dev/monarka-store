import { useMemo, useState } from 'react'
import { ALL_CATEGORY, SORT } from './constants.js'
import { collectColors, filterProducts } from './filterProducts.js'

/**
 * Estado de búsqueda / categoría / talla / color / orden del catálogo
 * y la lista resultante (`results`).
 */
export function useProductFilters(products) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState(ALL_CATEGORY)
  const [size, setSize] = useState(null)
  const [color, setColor] = useState(null)
  const [sort, setSort] = useState(SORT.RELEVANCE)

  const availableColors = useMemo(() => collectColors(products), [products])

  const results = useMemo(
    () => filterProducts(products, { search, category, size, color, sort }),
    [products, search, category, size, color, sort]
  )

  return {
    search,
    setSearch,
    category,
    setCategory,
    size,
    setSize,
    color,
    setColor,
    sort,
    setSort,
    availableColors,
    results
  }
}
