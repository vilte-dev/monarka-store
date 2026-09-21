-- MONARKA — Bucket de Storage para imagenes de productos
-- Ejecuta esto en Supabase Dashboard > SQL Editor.
-- Crea el bucket "product-images" (publico para lectura) y las
-- politicas para que solo usuarios con sesion iniciada (el panel
-- /admin) puedan subir, reemplazar o borrar imagenes.

-- Crea el bucket si no existe. "public = true" permite que las URLs
-- de las imagenes sean visibles para cualquiera (necesario para que
-- la tienda muestre las fotos sin iniciar sesion).
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

-- Lectura publica de las imagenes (para que la tienda las muestre)
drop policy if exists "Public read product images" on storage.objects;
create policy "Public read product images"
  on storage.objects for select
  using (bucket_id = 'product-images');

-- Solo usuarios autenticados (con sesion en /admin) pueden subir
drop policy if exists "Authenticated upload product images" on storage.objects;
create policy "Authenticated upload product images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'product-images');

-- Solo usuarios autenticados pueden reemplazar/actualizar imagenes
drop policy if exists "Authenticated update product images" on storage.objects;
create policy "Authenticated update product images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'product-images')
  with check (bucket_id = 'product-images');

-- Solo usuarios autenticados pueden borrar imagenes
drop policy if exists "Authenticated delete product images" on storage.objects;
create policy "Authenticated delete product images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'product-images');
