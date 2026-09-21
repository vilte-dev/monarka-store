import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Faltan VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY. ' +
      'Copia .env.example a .env y completa tus credenciales de Supabase.'
  )
}

/** Cliente único de Supabase. Toda la app lo importa desde aquí. */
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
