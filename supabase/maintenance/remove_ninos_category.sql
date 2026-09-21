-- ============================================================
-- MONARKA — Eliminar productos de la categoria "Ninos"
-- Ejecuta esto en Supabase Dashboard > SQL Editor.
-- ============================================================

-- 1) Revisa antes de borrar que estos son los productos correctos:
select id, name, category, price
from public.products
where category = 'Ninos';

-- 2) Si la lista de arriba es correcta, borra esos productos:
delete from public.products
where category = 'Ninos';
