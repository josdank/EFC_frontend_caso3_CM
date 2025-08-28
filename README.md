# EFC Frontend citas médicas (React + Vite + Tailwind)

Frontend **responsivo** y de **estilo minimalista** que cubre **el caso N°3 CITAS MÉDICAS** del Examen de Fin de Carrera (TSDS).
El mismo proyecto funciona.

## ✅ Características

- **Login** (email/clave) con token en `localStorage` y rutas protegidas.
- **Dashboard** con módulos según el caso seleccionado.
- **CRUD completo** para 3 entidades de dominio + 1 entidad de relación (matrículas / reservas / citas / tickets).
- **UI/UX** moderna, responsive, accesible y reusable (componentes y páginas genéricas).
- **API client** con base URL configurable y **modo MOCK** (sin backend) usando `localStorage`.
- **Mensajería de errores** y validación mínima del lado del cliente.
- Estructura de proyecto clara y lista para producción con Vite.

## 🛠️ Requisitos

- Node.js
- npm o pnpm o yarn

## 🚀 Comandos

```bash
# Instalar dependencias
npm i

# Iniciar en desarrollo (por defecto CASE 1 y MOCK activado)
npm run dev

# Build de producción
npm run build

# Preview del build
npm run preview
```

## 🔧 Configuración por entorno

Cree un archivo `.env` en la raíz (o use `.env.local`) con las variables:

```bash
# Seleccione el caso de estudio (1..5)
VITE_CASE_ID=EJEMPLO

# Base URL del backend (solo si NO usa mock)
VITE_API_BASE_URL=http://tu_urldelbackend

```

- **VITE_CASE_ID** define el dominio: entidades, campos y módulos que se muestran.
- Si **VITE_MOCK=false**, el frontend consumirá endpoints REST:
  - `POST /auth/login`  → `{ token, user }`
  - `GET /:entity`      → lista
  - `GET /:entity/:id`  → detalle
  - `POST /:entity`     → crear
  - `PUT /:entity/:id`  → actualizar
  - `DELETE /:entity/:id` → eliminar

> Ajuste `:entity` con los **keys** definidos en `src/config/cases.js` (e.g., `estudiantes`, `materias`, `matriculas`, etc.).

## 🧩 Estructura

```
efc_frontend_senior/
├─ public/
│  └─ logo.svg
├─ src/
│  ├─ components/
│  │  ├─ DataTable.jsx
│  │  ├─ FormRenderer.jsx
│  │  ├─ Layout.jsx
│  │  └─ ProtectedRoute.jsx
│  ├─ config/
│  │  └─ cases.js         # Definición del caso (entidades y campos)
│  ├─ lib/
│  │  ├─ api.js           # Cliente REST + token 
│  │  └─ mock.js          # Persistencia en localStorage
│  ├─ pages/
│  │  ├─ Dashboard.jsx
│  │  ├─ EntityForm.jsx
│  │  ├─ EntityList.jsx
│  │  ├─ Login.jsx
│  │  └─ NotFound.jsx
│  ├─ store/
│  │  └─ auth.js          # Zustand: sesión y token
│  ├─ App.jsx
│  ├─ index.css
│  └─ main.jsx
├─ index.html
├─ package.json
├─ postcss.config.js
├─ tailwind.config.js
└─ vite.config.js
```

## 🧪 Cómo probar rápido (mock)

1. `cp .env.example .env` (o cree `.env` con `VITE_MOCK=true`).
2. `npm i && npm run dev`
3. Entre a `http://localhost:5173`
4. Inicie sesión con cualquier correo/clave (modo mock permite login demo).
5. Cree/edite/elimine registros en cada módulo. Los datos se guardan en `localStorage`.

## 🔐 Reglas de UI según la guía

- Pantalla **Login** con *Email* y *Clave*.
- Mensaje de error “Usuario o contraseña incorrectos” cuando proceda.
- Tras login, mostrar **Bienvenido – Nombre del usuario** y **módulos asignados**.
- Rutas protegidas: si no hay sesión, **redirigir** a `/login`.
- **CRUD** completo por cada módulo.
- **Responsive** (sidebar colapsable en móvil, grid adaptable).

> Todo lo anterior responde a los requerimientos descritos en la guía del EFC (módulos, login, CRUD, consumo de endpoints y fallback a CMS/mock).

## 📦 Producción

```bash
npm run build
npm run preview
```

Despliegue estático (Netlify, Vercel, GitHub Pages) o detrás de su backend (Nginx).

---

Hecho con ❤️ de forma ética para el examen.


## 🔌 Conectar con tu backend real

1) En `.env`, desactiva el mock:
```
VITE_MOCK=false
VITE_API_BASE_URL=http://localhost:3000/api
```
2) Si tus rutas o formas de respuesta son diferentes, ajusta **una sola vez** `src/config/backend.js`:
- `auth.loginPath`, `tokenField`, `userField`
- `cases[N].entities` para mapear cada entidad a su endpoint real
- `onAfterReceiveList / onAfterReceiveOne` si tu backend envuelve datos (p. ej. `{data: [...]}`)
- `onBeforeSend` para transformar payloads
