# Plan de Implementación: PumQuiz! (Español)

## Resumen del Proyecto

Aplicación de trivia full-stack con:
- **Frontend:** React 19 + TypeScript + Vite + Tailwind CSS v4
- **Backend:** Node.js + Express + TypeScript
- **Base de datos:** PostgreSQL con Prisma ORM (v7, con driver adapter)
- **Autenticación:** JWT (access + refresh tokens) + verificación por email (Nodemailer)

---

## Estado Actual de las Tareas

### ✅ Backend — Completado

- [x] **1. Estructura del proyecto y base de datos**
  - [x] 1.1 Inicializar backend con TypeScript y Express
  - [x] 1.2 Definir esquema de Prisma y generar el client
  - [x] 1.3 Crear módulos de utilidad (password, jwt, validators)

- [x] **2. Servicios y rutas de autenticación**
  - [x] 2.1 Servicio de auth (registro, verificación, login, refresh, logout)
  - [x] 2.2 Servicio de email (Nodemailer)
  - [x] 2.3 Middlewares de auth (JWT, admin, validación)
  - [x] 2.4 Rutas y controlador de auth
  - [x] EXTRA: Endpoint de reenviar código de verificación (`/resend-code`)
  - [ ]* 2.5 Tests unitarios del servicio de auth (OPCIONAL — no hecho)

- [x] **3. Checkpoint — Auth del backend verificada**

- [x] **4. Gestión de perfil de usuario**
  - [x] 4.1 Servicio y rutas de usuario (perfil, cambiar username, subir avatar)
  - [ ]* 4.2 Tests unitarios de perfil (OPCIONAL — no hecho)

- [x] **5. Gestión de trivias y gameplay (backend)**
  - [x] 5.1 Servicio de trivias (listar, filtrar, obtener preguntas)
  - [x] 5.2 Servicio de puntuación (puntos por velocidad)
  - [x] 5.3 Envío de intentos con seguimiento de mejor puntaje
  - [x] 5.4 Rutas y controladores de trivias e intentos
  - [ ]* 5.5 Tests unitarios de puntuación e intentos (OPCIONAL — no hecho)

- [x] **6. Rachas, leaderboards y carga de trivias por admin**
  - [x] 6.1 Servicio de rachas (streaks)
  - [x] 6.2 Servicio de leaderboard
  - [x] 6.3 Rutas de leaderboard y rachas
  - [x] 6.4 Carga de trivias por admin (JSON)
  - [ ]* 6.5 Tests unitarios de rachas/leaderboard/admin (OPCIONAL — no hecho)

- [x] **7. Middleware de manejo de errores**
  - [x] 7.1 Manejador global de errores (Zod, Prisma, JWT, Multer)

- [x] **8. Checkpoint — Backend completo verificado**

### ✅ Frontend — Completado

- [x] **9. Estructura del proyecto frontend**
  - [x] 9.1 Inicializar con Vite, React y TypeScript
  - [x] 9.2 Tipos de TypeScript y capa de servicios API (Axios + interceptores)
  - [x] 9.3 Contexto de auth y rutas protegidas

- [x] **10. Páginas de autenticación**
  - [x] 10.1 Página de registro
  - [x] 10.2 Página de verificación de email
  - [x] 10.3 Página de login

- [x] **11. Catálogo de trivias y gameplay**
  - [x] 11.1 Página Home con catálogo de trivias
  - [x] 11.2 Página de detalle de trivia
  - [x] 11.3 Página de juego (timer + flujo de preguntas)
  - [x] 11.4 Página de resultados

- [x] **12. Perfil, rachas y leaderboard (frontend)**
  - [x] 12.1 Página de perfil
  - [x] 12.2 Página de leaderboard

- [x] **13. Enrutamiento y navegación**
  - [x] 13.1 Configurar React Router y layout de la app (NavBar)

- [x] **14. Checkpoint — Frontend completo verificado**

### ✅ Integración final — Completado

- [x] **15. Integración y ajustes finales**
  - [x] 15.1 Script de seed con datos de ejemplo (idempotente, 3 trivias de calidad)
  - [x] 15.2 Rate limiting y seguridad (Helmet, CORS)
  - [ ]* 15.3 Tests de integración (OPCIONAL — no hecho)

- [x] **16. Checkpoint final — Full stack verificado**

---

## Feedback: ¿Qué puede hacer la app actualmente?

### 👤 Cualquier usuario (visitante / jugador registrado)

**SÍ puede:**
- ✅ Registrarse con email, teléfono, username, cumpleaños y contraseña
- ✅ Recibir un código de verificación de 6 dígitos por email (SMTP Ethereal en desarrollo)
- ✅ Verificar su email con el código
- ✅ Reenviar el código si expira (endpoint `/resend-code`)
- ✅ Iniciar sesión y mantener la sesión (refresh token automático, dura 7 días)
- ✅ Cerrar sesión (botón en el NavBar)
- ✅ Ver el catálogo de trivias y filtrar por categoría y dificultad
- ✅ Jugar cualquier trivia (10 preguntas, timer de 7 segundos, orden aleatorio)
- ✅ Ganar puntos según la velocidad de respuesta (100/75/50/0 pts)
- ✅ Ver resultados con explicaciones de las preguntas falladas
- ✅ Mantener una racha diaria (streak con 🔥)
- ✅ Ver leaderboard global y por categoría (top 10)
- ✅ Cambiar su propio nombre de usuario
- ✅ Cambiar su propia foto de perfil (avatar)

**NO puede:**
- ❌ Crear trivias nuevas (solo admin)
- ❌ Editar o borrar trivias

### 🔑 Administrador

**SÍ puede (solo vía Postman / API, NO desde la app):**
- ✅ Subir trivias nuevas en formato JSON (`POST /api/admin/trivias`)
- ✅ Borrar trivias (`DELETE /api/admin/trivias/:id`)

**NO puede (aún):**
- ❌ Subir trivias desde la interfaz de la app (no hay UI de admin)
- ❌ Borrar trivias desde la app (solo Postman/pgAdmin)
- ❌ Editar el contenido de una trivia existente (no existe endpoint de edición — ni en API ni en app)

---

## Limitaciones conocidas / Pendientes

### Funcionalidad de admin (falta UI)
1. **No hay panel de admin en el frontend.** Toda la gestión de trivias se hace por Postman o pgAdmin.
   - Subir trivias → solo `POST /api/admin/trivias` vía Postman
   - Borrar trivias → solo `DELETE /api/admin/trivias/:id` vía Postman o pgAdmin
2. **No existe endpoint de EDICIÓN de trivias.** Para editar hay que borrar y volver a crear, o modificar directamente en pgAdmin.

### Tests (opcionales, no implementados)
- Tests unitarios del backend (auth, scoring, streaks, admin, perfil)
- Tests de integración de los flujos completos

### Otros detalles
- El email usa un SMTP de prueba (Ethereal). Para producción hay que configurar un proveedor real (Gmail, SendGrid, etc.)
- Las contraseñas de secretos JWT en `.env` son de desarrollo — cambiar en producción
- No hay confirmación de contraseña en el registro (solo un campo de password)
- No hay recuperación de contraseña ("olvidé mi contraseña")

---

## Ideas para el futuro (tu lista de pendientes manuales)

- [ ] Botón/página de admin para subir trivias desde la app (formulario o carga de JSON)
- [ ] Botón de borrar trivia en la app (visible solo para admins)
- [ ] Funcionalidad de editar trivias (nuevo endpoint `PATCH /api/admin/trivias/:id` + UI)
- [ ] Recuperación de contraseña
- [ ] Confirmación de contraseña en registro
- [ ] Trivias comunitarias (el modelo de datos ya lo soporta con el campo `type: COMMUNITY`)
- [ ] **Convertir a app móvil / PWA** (guardar en pantalla de inicio, instalable):
  - Opción rápida (PWA): agregar `manifest.json`, íconos y service worker con `vite-plugin-pwa`. Costo $0, funciona en Android e iPhone (Safari → Compartir → Agregar a inicio).
  - Opción tiendas (Capacitor): envolver el React actual en app nativa. Google Play $25 único, Apple $99/año, requiere Mac para iOS.
  - Opción nativa (React Native): reescribir la UI. Mayor esfuerzo, mejor rendimiento.

---

## Arquitectura del proyecto

### Backend (por capas)
```
backend/src/
├── config/       → configuración (env, database)
├── controllers/  → manejan req/res HTTP
├── routes/       → definen los endpoints
├── services/     → lógica de negocio
├── middlewares/  → auth, admin, validación, errores
├── utils/        → jwt, password, validators, errors
└── app.ts        → punto de entrada
```

### Frontend (por capas)
```
frontend/src/
├── types/        → interfaces/tipos
├── services/     → llamadas a la API (Axios)
├── context/      → estado global (AuthContext)
├── hooks/        → lógica reutilizable (useTimer, useLeaderboard)
├── components/   → componentes UI reutilizables
├── pages/        → páginas completas
└── App.tsx       → enrutamiento
```

---

## Credenciales del seed (datos de prueba)

| Rol | Email | Contraseña |
|-----|-------|-----------|
| Admin | admin@pumquiz.com | Admin@123 |
| Jugador | player1@pumquiz.com | Player@123 |
| Jugador | player2@pumquiz.com | Player@123 |

**Trivias precargadas:** Mundial 2026, Fundamentos de Programación, Cultura General (10 preguntas cada una).

Para re-cargar los datos: `npm run prisma:seed` (borra todo y re-inserta).

=================================
TAREAS PARA CORREGIR MANUALMENTE
=================================
- Mover el componente AddTrivia a App.tsx para no       duplicar codigo en cada page
