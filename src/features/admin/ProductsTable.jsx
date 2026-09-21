import { formatPrice } from '@/utils/format.js'

export default function ProductsTable({ products, loading, onEdit, onDelete }) {
  return (
    <div className="admin-table-wrap">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Categoria</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Nuevo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr>
              <td colSpan={7}>Cargando...</td>
            </tr>
          )}
          {!loading && products.length === 0 && (
            <tr>
              <td colSpan={7}>Aun no hay productos. Agrega el primero.</td>
            </tr>
          )}
          {!loading &&
            products.map((p) => (
              <tr key={p.id}>
                <td>
                  <img src={p.image_url} alt={p.name} />
                </td>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>{formatPrice(p.price)}</td>
                <td>{p.stock}</td>
                <td>{p.is_new ? 'Si' : 'No'}</td>
                <td>
                  <div className="row-actions">
                    <button className="edit-btn" onClick={() => onEdit(p)}>
                      Editar
                    </button>
                    <button className="delete-btn" onClick={() => onDelete(p.id)}>
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}
