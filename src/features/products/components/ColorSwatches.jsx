import { describeColor } from '@/utils/color.js'

/**
 * Fila de círculos de color (recibe códigos hex). No renderiza nada si no hay colores.
 * Si se pasa `onSelect`, los círculos son botones y `selected` marca el elegido.
 */
export default function ColorSwatches({ colors, selected, onSelect }) {
  if (!colors?.length) return null

  return (
    <div className="swatch-row">
      {colors.map((c, i) =>
        onSelect ? (
          <button
            key={`${c}-${i}`}
            type="button"
            className={`swatch swatch-btn ${selected === c ? 'active' : ''}`.trim()}
            style={{ background: c }}
            onClick={() => onSelect(c)}
            aria-label={`Color ${describeColor(c)}`}
            aria-pressed={selected === c}
          />
        ) : (
          <span key={`${c}-${i}`} className="swatch" style={{ background: c }} />
        )
      )}
    </div>
  )
}
