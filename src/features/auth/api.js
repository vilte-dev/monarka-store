import { supabase } from '@/lib/supabase.js'

/** Inicia sesión con correo y contraseña. Lanza el error de Supabase si las credenciales fallan. */
export async function signIn(email, password) {
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
}

export async function signOut() {
  await supabase.auth.signOut()
}
