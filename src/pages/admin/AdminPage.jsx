import { useState } from 'react'
import AdminHeader from '@/features/admin/AdminHeader.jsx'
import ProductForm from '@/features/admin/ProductForm.jsx'
import ProductsTable from '@/features/admin/ProductsTable.jsx'
import { formToPayload } from '@/features/admin/productFormModel.js'
import { useProductForm } from '@/features/admin/useProductForm.js'
import { createProduct, deleteProduct, updateProduct } from '@/features/products/api.js'
import { useProducts } from '@/features/products/useProducts.js'

/** Panel de administración (ruta protegida): CRUD del catálogo. */
export default function AdminPage() {
  const { products, loading, error: loadError, refetch } = useProducts()
  const { form, setField, toggleSize, reset, loadProduct } = useProductForm()
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState(null) // { type: 'success' | 'error', message }

  // Si falla la carga del catálogo se muestra como banner, salvo que haya un mensaje más reciente.
  const banner =
    status ??
    (loadError ? { type: 'error', message: 'No se pudo cargar el catalogo: ' + loadError } : null)

  function handleEdit(product) {
    loadProduct(product)
    setStatus(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function handleDelete(id) {
    if (!window.confirm('Eliminar este producto del catalogo?')) return

    try {
      await deleteProduct(id)
    } catch (err) {
      setStatus({ type: 'error', message: 'No se pudo eliminar: ' + err.message })
      return
    }

    setStatus({ type: 'success', message: 'Producto eliminado.' })
    refetch()
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    setStatus(null)

    const isEditing = Boolean(form.id)
    const payload = formToPayload(form)

    try {
      if (isEditing) {
        await updateProduct(form.id, payload)
      } else {
        await createProduct(payload)
      }
      setStatus({
        type: 'success',
        message: isEditing ? 'Producto actualizado.' : 'Producto agregado al catalogo.'
      })
      reset()
      refetch()
    } catch (err) {
      setStatus({ type: 'error', message: 'No se pudo guardar: ' + err.message })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="admin-page">
      <div className="wrap">
        <AdminHeader />

        {banner && <div className={`status-banner ${banner.type}`}>{banner.message}</div>}

        <div className="admin-layout">
          <ProductForm
            form={form}
            onFieldChange={setField}
            onToggleSize={toggleSize}
            onSubmit={handleSubmit}
            onCancel={reset}
            saving={saving}
            onStatus={setStatus}
          />
          <ProductsTable
            products={products}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  )
}
