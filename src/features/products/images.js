// Subida de imágenes de producto a Supabase Storage.
// El bucket se crea con supabase/setup/02_storage.sql

import { supabase } from '@/lib/supabase.js'

const STORAGE_BUCKET = 'product-images'
export const MAX_IMAGE_MB = 5

/** Devuelve un mensaje de error si el archivo no es válido, o null si está bien. */
export function validateImageFile(file) {
  if (!file.type.startsWith('image/')) {
    return 'Solo se permiten archivos de imagen (jpg, png, webp...).'
  }
  if (file.size > MAX_IMAGE_MB * 1024 * 1024) {
    return `La imagen supera los ${MAX_IMAGE_MB}MB permitidos.`
  }
  return null
}

/** Sube la imagen y devuelve su URL pública. Lanza el error de Supabase si falla. */
export async function uploadProductImage(file) {
  const ext = file.name.split('.').pop()
  const safeExt = ext ? ext.toLowerCase().replace(/[^a-z0-9]/g, '') : 'jpg'
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${safeExt}`
  const filePath = `products/${fileName}`

  const { error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(filePath, file, { cacheControl: '3600', upsert: false })

  if (error) throw error

  const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(filePath)
  return data.publicUrl
}
