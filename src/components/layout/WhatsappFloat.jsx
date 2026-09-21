import { WhatsappIcon } from '@/components/ui/Icons.jsx'
import { WHATSAPP_URL } from '@/config/site.js'

export default function WhatsappFloat() {
  return (
    <a
      className="whatsapp-float"
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Escribenos por WhatsApp"
    >
      <WhatsappIcon />
    </a>
  )
}
