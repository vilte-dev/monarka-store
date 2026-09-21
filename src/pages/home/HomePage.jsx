import { useCallback, useState } from 'react'
import Header from '@/components/layout/Header.jsx'
import Footer from '@/components/layout/Footer.jsx'
import WhatsappFloat from '@/components/layout/WhatsappFloat.jsx'
import { useCart } from '@/features/cart/useCart.js'
import FaqModal from '@/features/help/FaqModal.jsx'
import ProductGrid from '@/features/products/components/ProductGrid.jsx'
import { useProducts } from '@/features/products/useProducts.js'
import { useProductFilters } from '@/features/products/useProductFilters.js'
import Hero from './Hero.jsx'

/** Portada de la tienda: header, hero, catálogo con filtros y footer. */
export default function HomePage() {
  const { products, loading, error } = useProducts()
  const filters = useProductFilters(products)
  const { count, addItem, openCart } = useCart()

  const [faqOpen, setFaqOpen] = useState(false)
  const openFaq = useCallback(() => setFaqOpen(true), [])
  const closeFaq = useCallback(() => setFaqOpen(false), [])

  // Agrega a la bolsa y la abre para que el cliente vea el resultado.
  const handleAddToBag = useCallback(
    (product, selection) => {
      addItem(product, selection)
      openCart()
    },
    [addItem, openCart]
  )

  return (
    <>
      <Header
        search={filters.search}
        onSearchChange={filters.setSearch}
        activeCategory={filters.category}
        onCategoryChange={filters.setCategory}
        bagCount={count}
        onBagClick={openCart}
      />
      <Hero />
      <ProductGrid
        products={filters.results}
        loading={loading}
        error={error}
        filters={filters}
        onAddToBag={handleAddToBag}
      />
      <Footer onSearchChange={filters.setSearch} onOpenFaq={openFaq} />
      <WhatsappFloat />
      {faqOpen && <FaqModal onClose={closeFaq} />}
    </>
  )
}
