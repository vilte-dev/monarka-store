import Modal from '@/components/ui/Modal.jsx'
import { WHATSAPP_URL } from '@/config/site.js'
import { FAQS } from './faqs.js'

export default function FaqModal({ onClose }) {
  return (
    <Modal className="faq-modal" onClose={onClose} label="Preguntas frecuentes">
      <span className="eyebrow">Ayuda</span>
      <h3>Preguntas frecuentes</h3>

      <div className="faq-list">
        {FAQS.map((item) => (
          <details key={item.q} className="faq-item">
            <summary>{item.q}</summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>

      <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="btn btn-outline faq-cta">
        Sigues con dudas? Escribenos por WhatsApp
      </a>
    </Modal>
  )
}
