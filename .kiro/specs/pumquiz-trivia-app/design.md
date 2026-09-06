## **Technical Design Document**


## Overview

PumQuiz! is a full-stack trivia application built with React (TypeScript) on the frontend, Node.js/Express (TypeScript) on the backend, PostgreSQL as the database, and Prisma as the ORM. The system follows a RESTful API architecture with JWT-based authentication.

## Architecture

```
┌─────────────────┐       ┌─────────────────────┐       ┌──────────────┐
│  React Frontend │──────▶│  Express Backend API │──────▶│  PostgreSQL  │
│  (TypeScript)   │◀──────│  (TypeScript)        │◀──────│  (Prisma)    │
└─────────────────┘       └─────────────────────┘       └──────────────┘
                                    │
                                    ▼
                          ┌─────────────────────┐
                          │  Email Service       │
                          │  (Nodemailer)        │
                          └─────────────────────┘
```

## Technology Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Frontend   | React 18, TypeScript, Vite        |
| Styling    | Tailwind CSS                      |
| Routing    | React Router v6                   |
| State      | React Context + hooks             |
| Backend    | Node.js, Express, TypeScript      |
| ORM        | Prisma                            |
| Database   | PostgreSQL                        |
| Auth       | JWT (access + refresh tokens)     |
| Email      | Nodemailer (SMTP configurable)    |
| Validation | Zod (backend), React Hook Form (frontend) |
| File Upload| Multer (profile pictures)         |

## Database Schema (Prisma)

```prisma
model User {
  id              String    @id @default(uuid())
  email           String    @unique
  username        String    @unique
  phone           String
  birthday        DateTime
  passwordHash    String
  profilePicture  String?
  emailVerified   Boolean   @default(false)
  verificationCode String?
  verificationExpiry DateTime?
  role            Role      @default(USER)
  currentStreak   Int       @default(0)
  lastPlayedDate  DateTime?
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  attempts        Attempt[]
  bestScores      BestScore[]
  createdTrivias  Trivia[]

  @@map("users")
}

enum Role {
  USER
  ADMIN
}

model Trivia {
  id          String     @id @default(uuid())
  title       String
  category    String
  difficulty  Difficulty
  type        TriviaType @default(OFFICIAL)
  createdBy   String
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt

  creator     User       @relation(fields: [createdBy], references: [id])
  questions   Question[]
  attempts    Attempt[]
  bestScores  BestScore[]

  @@map("trivias")
}

enum Difficulty {
  EASY
  MEDIUM
  HARD
}

enum TriviaType {
  OFFICIAL
  COMMUNITY
}

model Question {
  id          String   @id @default(uuid())
  triviaId    String
  question    String
  options     String[] // Array of 4 options
  correctIndex Int     // 0-3
  explanation String?  // Brief explanation for learning

  trivia      Trivia   @relation(fields: [triviaId], references: [id], onDelete: Cascade)
  answers     Answer[]

  @@map("questions")
}

model Attempt {
  id          String   @id @default(uuid())
  userId      String
  triviaId    String
  totalScore  Int
  correctCount Int
  completedAt DateTime @default(now())

  user        User     @relation(fields: [userId], references: [id])
  trivia      Trivia   @relation(fields: [triviaId], references: [id])
  answers     Answer[]

  @@map("attempts")
}

model Answer {
  id          String   @id @default(uuid())
  attemptId   String
  questionId  String
  selectedIndex Int?   // null if timed out
  isCorrect   Boolean
  responseTime Float   // seconds (e.g., 2.5)
  pointsEarned Int

  attempt     Attempt  @relation(fields: [attemptId], references: [id], onDelete: Cascade)
  question    Question @relation(fields: [questionId], references: [id])

  @@map("answers")
}

model BestScore {
  id          String   @id @default(uuid())
  userId      String
  triviaId    String
  score       Int
  achievedAt  DateTime @default(now())

  user        User     @relation(fields: [userId], references: [id])
  trivia      Trivia   @relation(fields: [triviaId], references: [id])

  @@unique([userId, triviaId])
  @@map("best_scores")
}
```

## API Endpoints

### Authentication

| Method | Endpoint               | Description                | Auth Required |
|--------|------------------------|----------------------------|---------------|
| POST   | /api/auth/register     | Register new user          | No            |
| POST   | /api/auth/verify-email | Verify email with code     | No            |
| POST   | /api/auth/login        | Login and get tokens       | No            |
| POST   | /api/auth/refresh      | Refresh access token       | Refresh Token |
| POST   | /api/auth/logout       | Invalidate refresh token   | Yes           |

### User Profile

| Method | Endpoint               | Description                | Auth Required |
|--------|------------------------|----------------------------|---------------|
| GET    | /api/users/me          | Get current user profile   | Yes           |
| PATCH  | /api/users/me/username | Update username            | Yes           |
| PATCH  | /api/users/me/avatar   | Upload profile picture     | Yes           |

### Trivias

| Method | Endpoint                    | Description                    | Auth Required |
|--------|-----------------------------|--------------------------------|---------------|
| GET    | /api/trivias                | List all trivias (with filters)| Yes           |
| GET    | /api/trivias/:id            | Get trivia details             | Yes           |
| GET    | /api/trivias/:id/questions  | Get questions for a trivia     | Yes           |
| POST   | /api/trivias/:id/attempts   | Submit a completed attempt     | Yes           |

### Admin

| Method | Endpoint                    | Description                    | Auth Required |
|--------|-----------------------------|--------------------------------|---------------|
| POST   | /api/admin/trivias          | Upload trivia via JSON         | Admin         |
| DELETE | /api/admin/trivias/:id      | Delete a trivia                | Admin         |

### Leaderboard

| Method | Endpoint                         | Description                      | Auth Required |
|--------|----------------------------------|----------------------------------|---------------|
| GET    | /api/leaderboard/global          | Get top 10 global                | Yes           |
| GET    | /api/leaderboard/category/:name  | Get top 10 for a category        | Yes           |

### Streaks

| Method | Endpoint               | Description                | Auth Required |
|--------|------------------------|----------------------------|---------------|
| GET    | /api/streaks/me        | Get current user's streak  | Yes           |

## API Request/Response Examples

### POST /api/auth/register

**Request:**
```json
{
  "email": "user@example.com",
  "username": "pumplayer",
  "phone": "+521234567890",
  "birthday": "1995-06-15",
  "password": "MyP@ss123"
}
```

**Response (201):**
```json
{
  "message": "Account created. Verification code sent to email.",
  "userId": "uuid-here"
}
```

### POST /api/auth/login

**Request:**
```json
{
  "email": "user@example.com",
  "password": "MyP@ss123"
}
```

**Response (200):**
```json
{
  "accessToken": "jwt-access-token",
  "refreshToken": "jwt-refresh-token",
  "user": {
    "id": "uuid",
    "username": "pumplayer",
    "email": "user@example.com",
    "profilePicture": null,
    "currentStreak": 5
  }
}
```

### POST /api/trivias/:id/attempts

**Request:**
```json
{
  "answers": [
    { "questionId": "q-uuid-1", "selectedIndex": 2, "responseTime": 1.8 },
    { "questionId": "q-uuid-2", "selectedIndex": null, "responseTime": 7.0 },
    { "questionId": "q-uuid-3", "selectedIndex": 0, "responseTime": 3.2 }
  ]
}
```

**Response (200):**
```json
{
  "attemptId": "attempt-uuid",
  "totalScore": 475,
  "correctCount": 7,
  "isNewBestScore": true,
  "previousBestScore": 400,
  "results": [
    {
      "questionId": "q-uuid-1",
      "question": "¿En qué país se jugará la final?",
      "selectedIndex": 2,
      "correctIndex": 1,
      "isCorrect": false,
      "pointsEarned": 0,
      "explanation": "La final se jugará en Estados Unidos..."
    }
  ],
  "streakUpdated": true,
  "currentStreak": 6
}
```

### POST /api/admin/trivias

**Request:**
```json
{
  "title": "Mundial 2026 - Sedes",
  "category": "Mundial 2026",
  "difficulty": "EASY",
  "questions": [
    {
      "question": "¿En qué país se jugará la final del Mundial 2026?",
      "options": ["México", "Estados Unidos", "Canadá", "Colombia"],
      "correctIndex": 1,
      "explanation": "La final se disputará en el MetLife Stadium de Nueva Jersey, Estados Unidos."
    }
  ]
}
```

## Scoring Logic

```typescript
function calculatePoints(responseTime: number, isCorrect: boolean): number {
  if (!isCorrect) return 0;
  if (responseTime <= 2) return 100;
  if (responseTime <= 4) return 75;
  if (responseTime <= 6) return 50;
  return 0; // 7 seconds (barely made it or timed out)
}
```

## Authentication Flow

1. User registers → receives 6-digit code via email
2. User verifies email with code → account activated
3. User logs in → receives JWT access token (15min) + refresh token (7 days)
4. Access token sent in `Authorization: Bearer <token>` header
5. When access token expires, client uses refresh token to get new access token
6. Refresh tokens stored in DB for revocation capability

## Streak Logic

```typescript
// Called when user completes a trivia attempt
function updateStreak(user: User): void {
  const today = startOfDay(new Date());
  const lastPlayed = user.lastPlayedDate ? startOfDay(user.lastPlayedDate) : null;

  if (lastPlayed && isSameDay(today, lastPlayed)) {
    // Already played today, no streak update needed
    return;
  }

  const yesterday = subDays(today, 1);

  if (lastPlayed && isSameDay(yesterday, lastPlayed)) {
    // Played yesterday, increment streak
    user.currentStreak += 1;
  } else {
    // Broke the streak or first time, start at 1
    user.currentStreak = 1;
  }

  user.lastPlayedDate = new Date();
}
```

## Frontend Pages

| Page          | Route               | Description                              |
|---------------|---------------------|------------------------------------------|
| Login         | /login              | Email + password form                    |
| Register      | /register           | Registration form                        |
| Verify Email  | /verify             | 6-digit code input                       |
| Home          | /                   | Trivia catalog with filters              |
| Trivia Detail | /trivia/:id         | Trivia info + start button               |
| Play          | /trivia/:id/play    | Question screen with timer               |
| Results       | /trivia/:id/results | Score summary + explanations             |
| Profile       | /profile            | User info, streak, edit options           |
| Leaderboard   | /leaderboard        | Global + category tabs                   |

## Project Structure

### Backend

```
backend/
├── src/
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── user.controller.ts
│   │   ├── trivia.controller.ts
│   │   ├── attempt.controller.ts
│   │   ├── leaderboard.controller.ts
│   │   └── admin.controller.ts
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── user.routes.ts
│   │   ├── trivia.routes.ts
│   │   ├── attempt.routes.ts
│   │   ├── leaderboard.routes.ts
│   │   └── admin.routes.ts
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── email.service.ts
│   │   ├── trivia.service.ts
│   │   ├── scoring.service.ts
│   │   ├── streak.service.ts
│   │   └── leaderboard.service.ts
│   ├── middlewares/
│   │   ├── auth.middleware.ts
│   │   ├── admin.middleware.ts
│   │   ├── validation.middleware.ts
│   │   └── error.middleware.ts
│   ├── models/
│   │   └── (Prisma handles this via schema.prisma)
│   ├── utils/
│   │   ├── jwt.ts
│   │   ├── password.ts
│   │   └── validators.ts
│   ├── config/
│   │   ├── database.ts
│   │   └── env.ts
│   └── app.ts
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── package.json
└── tsconfig.json
```

### Frontend

```
frontend/
├── src/
│   ├── components/
│   │   ├── Timer.tsx
│   │   ├── QuestionCard.tsx
│   │   ├── OptionButton.tsx
│   │   ├── StreakBadge.tsx
│   │   ├── TriviaCard.tsx
│   │   ├── LeaderboardTable.tsx
│   │   └── ProtectedRoute.tsx
│   ├── pages/
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   ├── VerifyEmailPage.tsx
│   │   ├── HomePage.tsx
│   │   ├── TriviaDetailPage.tsx
│   │   ├── PlayPage.tsx
│   │   ├── ResultsPage.tsx
│   │   ├── ProfilePage.tsx
│   │   └── LeaderboardPage.tsx
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useTimer.ts
│   │   ├── useTrivia.ts
│   │   └── useLeaderboard.ts
│   ├── services/
│   │   ├── api.ts
│   │   ├── auth.service.ts
│   │   ├── trivia.service.ts
│   │   └── leaderboard.service.ts
│   ├── context/
│   │   └── AuthContext.tsx
│   ├── types/
│   │   ├── user.ts
│   │   ├── trivia.ts
│   │   └── leaderboard.ts
│   ├── utils/
│   │   └── scoring.ts
│   └── App.tsx
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── vite.config.ts
```

## Security Considerations

- Passwords hashed with bcrypt (12 rounds)
- JWT tokens with short expiry (15min access, 7d refresh)
- Rate limiting on auth endpoints (prevent brute force)
- Input validation with Zod on all endpoints
- CORS configured for frontend origin only
- Verification codes expire after 15 minutes
- Admin routes protected by role-based middleware
- SQL injection prevented by Prisma parameterized queries
- File upload size limits for profile pictures (max 2MB)
