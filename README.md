# PumQuiz! 🎯

Aplicación de trivia full-stack orientada al aprendizaje y la competición. Los usuarios se registran, juegan trivias cronometradas de opción múltiple, ganan puntos según su velocidad de respuesta, mantienen rachas diarias y compiten en tablas de clasificación.

## Stack tecnológico

| Capa       | Tecnología                              |
|------------|-----------------------------------------|
| Frontend   | React 19, TypeScript, Vite, Tailwind CSS v4 |
| Backend    | Node.js, Express, TypeScript            |
| Base de datos | PostgreSQL con Prisma ORM (v7)       |
| Auth       | JWT (access + refresh) + verificación por email |
| Email      | Nodemailer (SMTP configurable)          |

## Requisitos previos

- Node.js 18+
- PostgreSQL
- Una cuenta SMTP para el envío de emails (en desarrollo puedes usar [Ethereal](https://ethereal.email))

## Configuración

### Backend

```bash
cd backend
npm install
```

1. Crea una base de datos en PostgreSQL (por ejemplo `pumquiz-db`).
2. Copia el archivo de ejemplo de variables de entorno y complétalo con tus datos:

```bash
cp .env.example .env
```

3. Edita `.env` con tu `DATABASE_URL`, secretos JWT y credenciales SMTP.
4. Aplica el esquema a la base de datos y genera el client de Prisma:

```bash
npx prisma migrate dev --config prisma/prisma.config.ts
npm run prisma:generate
```

5. (Opcional) Carga datos de ejemplo (admin, jugadores y 3 trivias):

```bash
npm run prisma:seed
```

6. Inicia el servidor de desarrollo:

```bash
npm run dev
```

El backend corre en `http://localhost:3000`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

El frontend corre en `http://localhost:5173` (con proxy a la API del backend).

## Credenciales del seed (datos de prueba)

| Rol      | Email               | Contraseña   |
|----------|---------------------|--------------|
| Admin    | admin@pumquiz.com   | Admin@123    |
| Jugador  | player1@pumquiz.com | Player@123   |
| Jugador  | player2@pumquiz.com | Player@123   |

## Estructura del proyecto

```
.
├── backend/    → API REST (Express + Prisma)
└── frontend/   → SPA (React + Vite)
```

## Funcionalidades

- Registro con verificación de email (código de 6 dígitos)
- Login con JWT y refresh token automático
- Catálogo de trivias con filtros por categoría y dificultad
- Gameplay cronometrado (7-10s por pregunta) con puntuación por velocidad
- Seguimiento del mejor puntaje por trivia
- Rachas diarias
- Tablas de clasificación global y por categoría
- Gestión de perfil (username y avatar)
- Panel de administración vía API para cargar trivias en JSON

## Seguridad

- Contraseñas hasheadas con bcrypt
- Rate limiting en endpoints de autenticación
- Helmet para headers de seguridad
- Validación de entrada con Zod

## Notas

- El archivo `.env` **nunca** debe subirse al repositorio (contiene secretos). Usa `.env.example` como plantilla.
