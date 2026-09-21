/** Mensaje centrado para estados de carga a pantalla completa. */
export default function PageLoader({ message = 'Cargando...' }) {
  return <div style={{ padding: 60, textAlign: 'center' }}>{message}</div>
}
