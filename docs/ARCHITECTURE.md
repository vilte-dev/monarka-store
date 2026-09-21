# Arquitectura

Guía para entender el código sin tener que abrir todos los archivos.

## Idea general

El proyecto se organiza **por dominio** (auth, products, cart, admin, help) y no por tipo de archivo.
Todo lo que tiene que ver con productos —datos, hooks, constantes y componentes— vive junto en
`features/products/`. Las **páginas** solo arman piezas; la lógica está en `features/`.

```
        pages/  ──usa──▶  features/  ──usa──▶  lib/ (Supabase)
           │                  │
           └────usa───▶ components/ (ui, layout)   config/   utils/
```

Reglas de dependencias:

- `pages/` usa `features/` y `components/`. **Nada** importa de `pages/` ni de `app/`.
- `features/` usa `components/`, `lib/`, `config/` y `utils/`. Las features de panel (`admin`) pueden
  apoyarse en las de base (`products`, `auth`).
- `components/`, `lib/`, `config/` y `utils/` no importan de `features/`. Única excepción:
  `components/layout/Header.jsx` y `Footer.jsx` leen las categorías de `features/products/constants.js`.

## Qué hay en cada carpeta

| Carpeta              | Contenido                                                                                                                                                                           |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/`               | `App.jsx`: proveedor de sesión + tabla de rutas. Login y Admin se cargan bajo demanda.                                                                                              |
| `pages/<ruta>/`      | Una página por ruta. Ej. `pages/home/` tiene `HomePage.jsx` y `Hero.jsx` (solo de esa página).                                                                                      |
| `features/auth/`     | Sesión: `AuthProvider`, `useAuth`, `ProtectedRoute`, `api.js` (login/logout).                                                                                                       |
| `features/products/` | Catálogo: `api.js` (consultas), `useProducts`, `useProductFilters`, `filterProducts` (lógica pura), `constants.js`, `images.js`, y `components/` (tarjeta, grilla, filtros, modal). |
| `features/cart/`     | Bolsa de compras: `CartProvider` + `useCart` (estado global), `cartModel` (lógica pura: reducer, totales, mensaje de pedido), `cartStorage` (localStorage), `CartDrawer` y `CartLine`. El pedido se cierra por WhatsApp. |
| `features/admin/`    | Panel: `ProductForm`, `ProductsTable`, `AdminHeader`, `useProductForm`, `productFormModel`.                                                                                         |
| `features/help/`     | Preguntas frecuentes: `FaqModal` y los textos en `faqs.js`.                                                                                                                         |
| `components/ui/`     | Piezas genéricas sin lógica de negocio: `Modal`, `Icons`, `Logo`, `PageLoader`.                                                                                                     |
| `components/layout/` | Estructura del sitio: `Header`, `Footer`, `WhatsappFloat`.                                                                                                                          |
| `config/`            | `site.js`: nombre de marca, WhatsApp y redes. **Único lugar** donde están esos datos.                                                                                               |
| `lib/`               | `supabase.js`: el cliente de Supabase (falla con un mensaje claro si falta el `.env`).                                                                                              |
| `utils/`             | Funciones puras pequeñas (`formatPrice`).                                                                                                                                           |
| `styles/`            | CSS global. `index.css` importa los archivos en orden; `tokens.css` tiene los colores.                                                                                              |

La bolsa (`features/cart/`) depende de `products` (imagen de respaldo), pero `products` **no** conoce
la bolsa: `HomePage` conecta ambas pasando `onAddToBag` a `ProductGrid` y `bagCount`/`onBagClick` a `Header`.

## Convenciones

- **Imports absolutos con `@/`** apuntan a `src/` (`import Modal from '@/components/ui/Modal.jsx'`).
  Dentro de una misma carpeta de feature se usan rutas relativas (`./api.js`).
- **Nadie llama a Supabase directamente** salvo `api.js` / `images.js` de cada feature y
  `AuthProvider`. Los componentes usan hooks o funciones de `api.js`.
- **Un componente por archivo**, con nombre en `PascalCase.jsx`. Hooks: `useAlgo.js`. El resto: `camelCase.js`.
- **Constantes en un solo lugar.** Categorías, tallas, orden, número de WhatsApp: se editan en su
  archivo de constantes, no dentro de los componentes.
- **Lógica pura aparte de la UI.** Ej.: `filterProducts.js` no depende de React, por lo que es fácil de probar.
- **Estilos:** CSS global por sección, en `src/styles/`. **El orden de los `@import` en
  `styles/index.css` importa** (la cascada); `responsive.css` debe quedar al final.

## Cómo agregar cosas

**Una página nueva** (ej. `/contacto`)

1. Crear `src/pages/contacto/ContactoPage.jsx`.
2. Registrar la ruta en `src/app/App.jsx` (con `lazy(...)` si no es la portada).

**Una categoría nueva** → agregarla a `PRODUCT_CATEGORIES` en `features/products/constants.js`.
Aparece sola en el menú, el footer y el formulario del panel.

**Una pregunta frecuente** → agregar un `{ q, a }` en `features/help/faqs.js`.

**Un dato nuevo en el producto** (ej. `material`)

1. Agregar la columna en Supabase (`alter table public.products add column …`).
2. Añadirlo en `features/admin/productFormModel.js` (`EMPTY_FORM`, `productToForm`, `formToPayload`).
3. Agregar el campo en `features/admin/ProductForm.jsx` y mostrarlo donde corresponda.

## Seguridad

- La clave `anon` de Supabase **es pública por diseño** (queda dentro del JavaScript del navegador).
  Lo que protege los datos son las **políticas RLS** de `supabase/setup/01_schema.sql`: lectura
  pública, escritura solo con sesión iniciada. Por eso conviene tener el registro de usuarios desactivado
  en Supabase.
- Aun así `.env` no se versiona; solo `.env.example`.
- La clave `service_role` de Supabase **nunca** debe ir en este proyecto ni en variables `VITE_*`.
