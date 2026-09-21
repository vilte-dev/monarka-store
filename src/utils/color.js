/**
 * Nombre aproximado en español de un color hex: "#141414" -> "Negro".
 * Sirve para mostrar el color en texto (p. ej. en el pedido de WhatsApp).
 * Si el valor no es un hex válido, lo devuelve tal cual.
 */
export function describeColor(hex) {
  const match = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(String(hex).trim())
  if (!match) return String(hex)

  const full = match[1].length === 3 ? [...match[1]].map((c) => c + c).join('') : match[1]
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16) / 255)

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const l = (max + min) / 2
  const delta = max - min
  const s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1))

  let h = 0
  if (delta !== 0) {
    if (max === r) h = ((g - b) / delta) % 6
    else if (max === g) h = (b - r) / delta + 2
    else h = (r - g) / delta + 4
    h = (h * 60 + 360) % 360
  }

  // Sin saturación: escala de grises
  if (l < 0.12) return 'Negro'
  if (l > 0.94) return 'Blanco'
  if (s < 0.12) return l < 0.4 ? 'Gris oscuro' : l < 0.72 ? 'Gris' : 'Gris claro'

  if (h < 15 || h >= 345) return l > 0.75 ? 'Rosa' : l < 0.3 ? 'Vino' : 'Rojo'
  if (h < 45) {
    if (s < 0.55) return l < 0.5 ? 'Marron' : 'Beige'
    return l < 0.4 ? 'Marron' : 'Naranja'
  }
  if (h < 70) return l < 0.4 ? 'Oliva' : 'Amarillo'
  if (h < 165) return 'Verde'
  if (h < 200) return 'Turquesa'
  if (h < 260) return l < 0.35 ? 'Azul marino' : 'Azul'
  if (h < 290) return 'Morado'
  return l > 0.75 ? 'Rosa' : 'Fucsia'
}
