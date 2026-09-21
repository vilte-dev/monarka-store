// Datos de marca y contacto. Si cambian (número de WhatsApp, redes), se editan SOLO aquí.

export const SITE = {
  name: 'MONARKA',
  tagline: 'Ropa de Calidad',
  location: 'Tarija, Bolivia'
}

export const WHATSAPP_NUMBER = '59163786693'
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`

export const SOCIAL_LINKS = {
  facebook: 'https://facebook.com/monarka',
  instagram: 'https://www.instagram.com/shopmonarka',
  tiktok: 'https://www.tiktok.com/@shopmonarka1'
}

/** Enlace de WhatsApp con un mensaje ya escrito. */
export function buildWhatsappLink(message) {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`
}
