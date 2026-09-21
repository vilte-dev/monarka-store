# Monarka — Tienda de ropa

Tienda online para **Monarka** (Tarija, Bolivia): catálogo público con filtros, bolsa de compras y pedido por
WhatsApp, más un panel de administración protegido para gestionar los productos.

**Stack:** React 18 · Vite 5 · React Router 6 · Supabase (base de datos, Auth y Storage) · Vercel

Demo: https://TU-TIENDA.vercel.app

## Inicio rápido

Requisitos: **Node.js 20.19 o superior**.

```bash
npm install
cp .env.example .env     # y completa tus credenciales de Supabase
npm run dev              # http://localhost:5173
```

Antes de que el catálogo funcione hay que preparar Supabase (tablas, imágenes y usuario admin).
Guía paso a paso: **[docs/SUPABASE.md](docs/SUPABASE.md)**.

## Rutas

| Ruta     | Qué es                                                 | Acceso          |
| -------- | ------------------------------------------------------ | --------------- |
| `/`      | Tienda: hero, catálogo con filtros, bolsa, footer, FAQ | Público         |
| `/login` | Inicio de sesión del equipo                            | Público         |
| `/admin` | Panel: crear, editar y eliminar productos, subir fotos | Requiere sesión |

## Scripts

| Comando           | Qué hace                        |
| ----------------- | ------------------------------- |
| `npm run dev`     | Servidor de desarrollo          |
| `npm run build`   | Build de producción en `dist/`  |
| `npm run preview` | Sirve el build localmente       |
| `npm run lint`    | Revisa el código con ESLint     |
| `npm run format`  | Formatea el código con Prettier |

## Estructura del proyecto

```
monarka-store/
├── docs/                  Documentación (arquitectura y guía de Supabase)
├── public/                Archivos estáticos (logo/favicon)
├── supabase/              Scripts SQL: setup/ (primera vez) y maintenance/ (puntuales)
└── src/
    ├── main.jsx           Punto de entrada
    ├── app/               Composición de la app: providers y rutas
    ├── pages/             Una carpeta por ruta (home, login, admin); solo componen
    ├── features/          Lógica y UI por dominio: auth, products, cart, admin, help
    ├── components/        Componentes compartidos: ui/ (genéricos) y layout/ (Header, Footer…)
    ├── config/            Datos de marca y contacto (WhatsApp, redes)
    ├── lib/               Clientes de servicios externos (Supabase)
    ├── utils/             Funciones puras auxiliares
    └── styles/            CSS global dividido por sección
```

Para entender **dónde va cada cosa** y las reglas del proyecto, lee
**[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)**.

## Cambios frecuentes

| Quiero cambiar…                        | Archivo                                |
| -------------------------------------- | -------------------------------------- |
| Número de WhatsApp o redes sociales    | `src/config/site.js`                   |
| Preguntas frecuentes                   | `src/features/help/faqs.js`            |
| Categorías, tallas u opciones de orden | `src/features/products/constants.js`   |
| Colores y tipografía de la marca       | `src/styles/tokens.css` y `index.html` |

## Despliegue

El proyecto está listo para **Vercel**: `vercel.json` redirige todas las rutas a `index.html`
(necesario para que `/admin` y `/login` funcionen al recargar). Configura en Vercel las variables
`VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`.
