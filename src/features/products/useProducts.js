import { useCallback, useEffect, useRef, useState } from 'react'
import { fetchProducts } from './api.js'

/**
 * Carga el catálogo desde Supabase.
 * Devuelve { products, loading, error, refetch }. `error` es un mensaje (string) o null.
 */
export function useProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const isMounted = useRef(true)

  const refetch = useCallback(async () => {
    setLoading(true)
    try {
      const data = await fetchProducts()
      if (!isMounted.current) return
      setProducts(data)
      setError(null)
    } catch (err) {
      if (!isMounted.current) return
      setError(err.message)
    } finally {
      if (isMounted.current) setLoading(false)
    }
  }, [])

  useEffect(() => {
    isMounted.current = true
    refetch()
    return () => {
      isMounted.current = false
    }
  }, [refetch])

  return { products, loading, error, refetch }
}
