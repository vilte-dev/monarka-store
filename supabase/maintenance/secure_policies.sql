-- ============================================================
-- MONARKA — Asegurar el panel de administracion con login
-- Ejecuta esto en Supabase Dashboard > SQL Editor.
-- Es seguro correrlo aunque ya hayas ejecutado schema.sql antes:
-- solo reemplaza las politicas publicas de escritura por unas que
-- exigen un usuario autenticado (auth.role() = 'authenticated').
-- ============================================================

drop policy if exists "Public insert access" on public.products;
drop policy if exists "Authenticated insert access" on public.products;
create policy "Authenticated insert access"
  on public.products for insert
  to authenticated
  with check (true);

drop policy if exists "Public update access" on public.products;
drop policy if exists "Authenticated update access" on public.products;
create policy "Authenticated update access"
  on public.products for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Public delete access" on public.products;
drop policy if exists "Authenticated delete access" on public.products;
create policy "Authenticated delete access"
  on public.products for delete
  to authenticated
  using (true);

-- La lectura publica del catalogo (para la tienda) se mantiene igual:
-- "Public read access" sigue permitiendo select a cualquiera.
