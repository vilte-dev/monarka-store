import { useCallback, useState } from 'react'
import ProductCard from './ProductCard.jsx'
import ProductFilters from './ProductFilters.jsx'
import ProductModal from './ProductModal.jsx'

/**
 * Sección "Catálogo": filtros + grilla de tarjetas + modal de detalle.
 * `filters` es el objeto que devuelve useProductFilters().
 */
export default function ProductGrid({ products, loading, error, filters, onAddToBag }) {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const closeModal = useCallback(() => setSelectedProduct(null), [])

  const handleAddToBag = useCallback(
    (product, selection) => {
      onAddToBag(product, selection)
      setSelectedProduct(null)
    },
    [onAddToBag]
  )

  return (
    <section className="catalog" id="catalogo">
      <div className="wrap">
        <div className="catalog-head">
          <h2>Catalogo Monarka</h2>
          <span className="result-count">{products.length} productos</span>
        </div>

        <div className="catalog-grid">
          <ProductFilters
            colors={filters.availableColors}
            activeSize={filters.size}
            onSizeChange={filters.setSize}
            activeColor={filters.color}
            onColorChange={filters.setColor}
            sort={filters.sort}
            onSortChange={filters.setSort}
          />

          <div className="product-grid">
            {loading && <p>Cargando productos...</p>}
            {error && <p>Ocurrio un error al cargar el catalogo: {error}</p>}
            {!loading && !error && products.length === 0 && (
              <div className="empty-state">
                <h3>Sin resultados</h3>
                <p>No encontramos productos con esos filtros. Prueba con otra busqueda.</p>
              </div>
            )}
            {!loading &&
              !error &&
              products.map((p) => (
                <ProductCard key={p.id} product={p} onViewDetail={setSelectedProduct} />
              ))}
          </div>
        </div>
      </div>

      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={closeModal} onAddToBag={handleAddToBag} />
      )}
    </section>
  )
}
