import { useEffect } from 'react'
import { CloseIcon } from './Icons.jsx'

/**
 * Modal genérico: overlay, cierre con Escape / clic afuera / botón,
 * y bloqueo del scroll de la página mientras está abierto.
 *
 * Importante: `onClose` debe ser estable (useCallback o un setter) para no
 * re-registrar los listeners en cada render.
 */
export default function Modal({ onClose, className = '', overlayClassName = '', label, children }) {
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className={`modal-overlay ${overlayClassName}`.trim()} onClick={onClose}>
      <div
        className={`modal-panel ${className}`.trim()}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="Cerrar">
          <CloseIcon />
        </button>
        {children}
      </div>
    </div>
  )
}
