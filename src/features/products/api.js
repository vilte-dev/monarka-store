// Acceso a datos de la tabla "products" (Supabase). Ningún componente llama a supabase directamente.
// Todas las funciones lanzan el error de Supabase si algo falla; quien las llama decide cómo mostrarlo.

import { supabase } from '@/lib/supabase.js'

const TABLE = 'products'

export async function fetchProducts() {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data ?? []
}

export async function createProduct(payload) {
  const { error } = await supabase.from(TABLE).insert(payload)
  if (error) throw error
}

export async function updateProduct(id, payload) {
  const { error } = await supabase.from(TABLE).update(payload).eq('id', id)
  if (error) throw error
}

export async function deleteProduct(id) {
  const { error } = await supabase.from(TABLE).delete().eq('id', id)
  if (error) throw error
}
