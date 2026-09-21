-- MONARKA — Esquema de base de datos para Supabase
-- Ejecuta este script completo en: Supabase Dashboard > SQL Editor

create extension if not exists "uuid-ossp";
create extension if not exists pg_trgm;   -- necesaria para el índice idx_products_name_trgm

-- Tabla principal del catalogo
create table if not exists public.products (
  id           uuid primary key default uuid_generate_v4(),
  name         text not null,
  description  text,
  price        numeric(10,2) not null default 0,
  category     text not null default 'Mujer',   -- Mujer, Hombre, Accesorios, Ofertas
  sizes        text[] default '{}',              -- ej: {"S","M","L"}
  colors       text[] default '{}',              -- ej: {"#141414","#8f7443"}
  image_url    text not null,
  is_new       boolean default false,
  stock        integer default 0,
  created_at   timestamptz default now(),
  updated_at   timestamptz default now()
);

-- Mantiene updated_at al dia en cada UPDATE
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_products_updated_at on public.products;
create trigger trg_products_updated_at
  before update on public.products
  for each row execute function public.set_updated_at();

-- Indices utiles para busqueda y filtros
create index if not exists idx_products_category on public.products (category);
create index if not exists idx_products_created_at on public.products (created_at desc);
create index if not exists idx_products_name_trgm on public.products using gin (name gin_trgm_ops);


-- Seguridad a nivel de fila (RLS)

alter table public.products enable row level security;

-- Cualquiera puede LEER el catalogo (tienda publica)
drop policy if exists "Public read access" on public.products;
create policy "Public read access"
  on public.products for select
  using (true);

-- El panel de administracion (/admin) ahora exige iniciar sesion con
-- Supabase Auth. Por eso insertar, editar y borrar solo se permite a
-- usuarios autenticados (auth.role() = 'authenticated'), no a cualquiera
-- con la anon key.
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

-- Datos de ejemplo (opcional). Borra este bloque si no lo necesitas.
insert into public.products
  (name, description, price, category, sizes, colors, image_url, is_new, stock)
values
  ('Chamarra tipo bomber', 'Chamarra bomber de hombre, tela resistente al agua.', 949.00, 'Hombre',
   '{"S","M","L","XL"}', '{"#141414","#2b2820","#8f7443"}',
   'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800&auto=format&fit=crop', true, 24),

  ('Camisa polo spencer', 'Polo de algodon premium, corte regular.', 299.00, 'Hombre',
   '{"S","M","L","XL","XXL"}', '{"#141414","#c7ac79","#ece4d6"}',
   'https://images.unsplash.com/photo-1516826957135-700dedea698c?q=80&w=800&auto=format&fit=crop', true, 40),

  ('Chamarra acolchada', 'Chamarra acolchada con capucha, ideal para climas frios.', 1199.00, 'Hombre',
   '{"M","L","XL"}', '{"#141414","#2b2820"}',
   'https://images.unsplash.com/photo-1544923246-77307dd654cb?q=80&w=800&auto=format&fit=crop', false, 12),

  ('Vestido midi lino', 'Vestido midi de lino, silueta suelta.', 389.00, 'Mujer',
   '{"XS","S","M","L"}', '{"#ece4d6","#8f7443"}',
   'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop', true, 18),

  ('Chaqueta denim mujer', 'Chaqueta de mezclilla clasica.', 459.00, 'Mujer',
   '{"S","M","L"}', '{"#2b2820","#141414"}',
   'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800&auto=format&fit=crop', false, 15),

  ('Mochila urbana', 'Mochila resistente al agua con compartimento para laptop.', 349.00, 'Accesorios',
   '{}', '{"#141414","#8f7443"}',
   'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop', true, 30)
on conflict do nothing;
