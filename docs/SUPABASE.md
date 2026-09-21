# Configurar Supabase

La tienda usa Supabase para tres cosas: la tabla de productos, el login del panel y el almacenamiento
de fotos. Se configura **una sola vez**.

## 1. Crear el proyecto y las credenciales

1. Crea un proyecto en [supabase.com](https://supabase.com).
2. Ve a **Project Settings → API** y copia el **Project URL** y la clave **anon public**.
3. En la raíz del repo: `cp .env.example .env` y pega ambos valores:

```
VITE_SUPABASE_URL=https://TU-PROYECTO.supabase.co
VITE_SUPABASE_ANON_KEY=TU-ANON-KEY-PUBLICA
```

> El archivo `.env` está en `.gitignore`: **no lo subas al repositorio**.

## 2. Crear tablas, políticas e imágenes

En **SQL Editor** de Supabase ejecuta, en este orden:

| Orden | Archivo                         | Qué crea                                                                |
| ----- | ------------------------------- | ----------------------------------------------------------------------- |
| 1     | `supabase/setup/01_schema.sql`  | Tabla `products`, índices, seguridad (RLS) y 6 productos de ejemplo     |
| 2     | `supabase/setup/02_storage.sql` | Bucket público `product-images` y sus políticas (subir solo con sesión) |

La lectura del catálogo es pública; insertar, editar y borrar exige sesión iniciada.

## 3. Crear el usuario administrador

1. En Supabase: **Authentication → Users → Add user**.
2. Ingresa un correo (por ejemplo `admin@tu-dominio.com`) y una contraseña de **6 caracteres o más**.
3. Marca **Auto Confirm User** para poder iniciar sesión de inmediato.
4. Entra a `/login` en la app con esas credenciales.

Después desactiva el registro de nuevos usuarios, para que nadie más pueda crear una cuenta:
**Authentication → Sign In / Providers** y apaga **Allow new users to sign up**.

## Imágenes de productos

Desde `/admin` se puede **subir una foto desde el computador** (se guarda en el bucket
`product-images`, máximo 5 MB, cualquier formato de imagen) o **pegar la URL** de una imagen ya
publicada. El límite se cambia en `MAX_IMAGE_MB` (`src/features/products/images.js`).

## Scripts de mantenimiento (`supabase/maintenance/`)

Solo se usan en casos puntuales; no forman parte de la instalación inicial.

| Archivo                     | Cuándo usarlo                                                                                 |
| --------------------------- | --------------------------------------------------------------------------------------------- |
| `secure_policies.sql`       | Si tu base se creó con una versión antigua de `schema.sql` (políticas de escritura públicas). |
| `remove_ninos_category.sql` | Para borrar los productos de la categoría "Ninos" (revisa la lista antes de borrar).          |
