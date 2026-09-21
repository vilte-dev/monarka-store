import { useState } from 'react'
import { PRODUCT_CATEGORIES, PRODUCT_SIZES } from '@/features/products/constants.js'
import { uploadProductImage, validateImageFile } from '@/features/products/images.js'

/**
 * Formulario para crear o editar un producto (componente controlado: el estado vive en
 * useProductForm). `onStatus` recibe { type: 'success' | 'error', message } o null.
 */
export default function ProductForm({
  form,
  onFieldChange,
  onToggleSize,
  onSubmit,
  onCancel,
  saving,
  onStatus
}) {
  const [uploading, setUploading] = useState(false)

  async function handleFileUpload(e) {
    const file = e.target.files?.[0]
    e.target.value = '' // permite volver a elegir el mismo archivo después
    if (!file) return

    const validationError = validateImageFile(file)
    if (validationError) {
      onStatus({ type: 'error', message: validationError })
      return
    }

    setUploading(true)
    onStatus(null)

    try {
      const url = await uploadProductImage(file)
      onFieldChange('image_url', url)
      onStatus({ type: 'success', message: 'Imagen subida correctamente.' })
    } catch (err) {
      onStatus({ type: 'error', message: 'No se pudo subir la imagen: ' + err.message })
    } finally {
      setUploading(false)
    }
  }

  return (
    <form className="admin-form" onSubmit={onSubmit}>
      <h3>{form.id ? 'Editar producto' : 'Nuevo producto'}</h3>

      <div className="field">
        <label htmlFor="name">Nombre</label>
        <input
          id="name"
          required
          value={form.name}
          onChange={(e) => onFieldChange('name', e.target.value)}
          placeholder="Chamarra tipo bomber"
        />
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="price">Precio (Bs)</label>
          <input
            id="price"
            type="number"
            step="0.01"
            required
            value={form.price}
            onChange={(e) => onFieldChange('price', e.target.value)}
            placeholder="299.00"
          />
        </div>
        <div className="field">
          <label htmlFor="stock">Stock</label>
          <input
            id="stock"
            type="number"
            value={form.stock}
            onChange={(e) => onFieldChange('stock', e.target.value)}
            placeholder="20"
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="category">Categoria</label>
        <select
          id="category"
          value={form.category}
          onChange={(e) => onFieldChange('category', e.target.value)}
        >
          {PRODUCT_CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label>Tallas disponibles</label>
        <div className="filter-chip-row">
          {PRODUCT_SIZES.map((s) => (
            <button
              type="button"
              key={s}
              className={`filter-chip ${form.sizes.includes(s) ? 'active' : ''}`}
              onClick={() => onToggleSize(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="field">
        <label htmlFor="colors">Colores (codigos hex separados por coma)</label>
        <input
          id="colors"
          value={form.colors}
          onChange={(e) => onFieldChange('colors', e.target.value)}
          placeholder="#141414, #8f7443, #ece4d6"
        />
      </div>

      <div className="field">
        <label htmlFor="image_url">Imagen del producto</label>

        <div className="image-upload-row">
          <label className="btn btn-outline upload-btn">
            {uploading ? 'Subiendo...' : 'Subir desde mi PC'}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              disabled={uploading}
              hidden
            />
          </label>
          {form.image_url && (
            <img className="image-preview" src={form.image_url} alt="Vista previa" />
          )}
        </div>

        <div className="field-divider">
          <span>o pega una URL</span>
        </div>

        <input
          id="image_url"
          required
          value={form.image_url}
          onChange={(e) => onFieldChange('image_url', e.target.value)}
          placeholder="https://.../imagen.jpg"
        />
      </div>

      <div className="field">
        <label htmlFor="description">Descripcion</label>
        <textarea
          id="description"
          rows={3}
          value={form.description}
          onChange={(e) => onFieldChange('description', e.target.value)}
          placeholder="Tela resistente, corte regular..."
        />
      </div>

      <div className="checkbox-field">
        <input
          id="is_new"
          type="checkbox"
          checked={form.is_new}
          onChange={(e) => onFieldChange('is_new', e.target.checked)}
        />
        <label htmlFor="is_new" style={{ margin: 0 }}>
          Marcar como Nuevo
        </label>
      </div>

      <div className="form-actions">
        <button className="btn" type="submit" disabled={saving}>
          {saving ? 'Guardando...' : form.id ? 'Actualizar' : 'Agregar al catalogo'}
        </button>
        {form.id && (
          <button className="btn btn-outline" type="button" onClick={onCancel}>
            Cancelar edicion
          </button>
        )}
      </div>
      <p className="admin-note">
        Puedes subir la imagen directo desde tu computadora (se guarda en Supabase Storage) o pegar
        la URL de una imagen ya publicada en internet. Antes de usar la carga local, crea el bucket
        &quot;product-images&quot; siguiendo <code>supabase/setup/02_storage.sql</code>.
      </p>
    </form>
  )
}
