import { PRODUCT_SIZES, SORT_OPTIONS } from '../constants.js'

export default function ProductFilters({
  colors,
  activeSize,
  onSizeChange,
  activeColor,
  onColorChange,
  sort,
  onSortChange
}) {
  return (
    <aside className="filters">
      <h3>Filtrar por</h3>

      <div className="filter-group">
        <h4>Talla</h4>
        <div className="filter-chip-row">
          {PRODUCT_SIZES.map((s) => (
            <button
              key={s}
              className={`filter-chip ${activeSize === s ? 'active' : ''}`}
              onClick={() => onSizeChange(activeSize === s ? null : s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <h4>Color</h4>
        <div className="filter-chip-row">
          {colors.map((c) => (
            <button
              key={c}
              className={`color-dot ${activeColor === c ? 'active' : ''}`}
              style={{ background: c }}
              onClick={() => onColorChange(activeColor === c ? null : c)}
              aria-label={`Color ${c}`}
            />
          ))}
        </div>
      </div>

      <div className="filter-group">
        <h4>Ordenar por</h4>
        <select value={sort} onChange={(e) => onSortChange(e.target.value)}>
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </aside>
  )
}
