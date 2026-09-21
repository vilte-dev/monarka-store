/** Formatea un precio en bolivianos: 299 -> "Bs 299.00" */
export function formatPrice(value) {
  return `Bs ${Number(value).toFixed(2)}`
}
