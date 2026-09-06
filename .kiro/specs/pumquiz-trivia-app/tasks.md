# Implementation Plan: PumQuiz! Trivia Application

## Overview

A full-stack trivia application with React/TypeScript frontend, Node.js/Express/TypeScript backend, PostgreSQL with Prisma ORM, JWT authentication, timed gameplay, scoring, streaks, leaderboards, and admin trivia upload. Implementation proceeds from backend infrastructure through core services to frontend, wiring everything together incrementally.

## Tasks

- [x] 1. Set up backend project structure and database
  - [x] 1.1 Initialize backend project with TypeScript and Express
    - Create `backend/` directory with `package.json`, `tsconfig.json`
    - Install dependencies: express, typescript, prisma, @prisma/client, bcrypt, jsonwebtoken, zod, nodemailer, multer, cors, dotenv
    - Install dev dependencies: ts-node-dev, @types/express, @types/bcrypt, @types/jsonwebtoken, @types/nodemailer, @types/multer, @types/cors
    - Create `src/app.ts` with Express setup, CORS config, JSON body parser, and error middleware
    - Create `src/config/env.ts` with environment variable validation using Zod
    - _Requirements: 1.1, 1.4_

  - [x] 1.2 Define Prisma schema and generate client
    - Create `prisma/schema.prisma` with all models: User, Trivia, Question, Attempt, Answer, BestScore
    - Define enums: Role (USER, ADMIN), Difficulty (EASY, MEDIUM, HARD), TriviaType (OFFICIAL, COMMUNITY)
    - Define all relations and indexes as specified in the design
    - Create `src/config/database.ts` with PrismaClient singleton
    - Generate Prisma client and create initial migration
    - _Requirements: 13.1, 13.2, 13.3_

  - [x] 1.3 Create utility modules
    - Create `src/utils/password.ts` with bcrypt hash/compare functions (12 rounds)
    - Create `src/utils/jwt.ts` with sign/verify for access tokens (15min) and refresh tokens (7d)
    - Create `src/utils/validators.ts` with Zod schemas for all request payloads
    - _Requirements: 1.2, 3.1_

- [x] 2. Implement authentication services and routes
  - [x] 2.1 Implement auth service
    - Create `src/services/auth.service.ts` with register, verifyEmail, login, refreshToken, logout functions
    - Registration: validate input, check uniqueness of email/username, hash password, create user, generate 6-digit verification code with 15-minute expiry
    - Login: validate credentials, check email verified, generate access + refresh tokens
    - _Requirements: 1.1, 1.2, 1.3, 2.1, 2.2, 2.3, 3.1, 3.2, 3.3_

  - [x] 2.2 Implement email service
    - Create `src/services/email.service.ts` using Nodemailer with configurable SMTP transport
    - Implement sendVerificationEmail function that sends the 6-digit code
    - _Requirements: 1.4, 2.1_

  - [x] 2.3 Implement auth middleware
    - Create `src/middlewares/auth.middleware.ts` to verify JWT access token from Authorization header
    - Create `src/middlewares/admin.middleware.ts` to check user role is ADMIN
    - Create `src/middlewares/validation.middleware.ts` as generic Zod validation middleware
    - _Requirements: 3.1, 12.1_

  - [x] 2.4 Create auth routes and controller
    - Create `src/controllers/auth.controller.ts` with register, verifyEmail, login, refresh, logout handlers
    - Create `src/routes/auth.routes.ts` mapping POST endpoints: /register, /verify-email, /login, /refresh, /logout
    - Wire routes into app.ts under /api/auth prefix
    - _Requirements: 1.1, 2.1, 2.2, 3.1_

  - [ ]* 2.5 Write unit tests for auth service
    - Test password validation (min 8 chars, symbol, uppercase, number)
    - Test duplicate email/username rejection
    - Test verification code generation and validation
    - Test login with unverified email returns error
    - _Requirements: 1.2, 1.3, 2.2, 2.3, 3.2, 3.3_

- [x] 3. Checkpoint - Backend auth verified
  - Ensure all tests pass, ask the user if questions arise.

- [x] 4. Implement user profile management
  - [x] 4.1 Implement user service and routes
    - Create `src/controllers/user.controller.ts` with getProfile, updateUsername, updateAvatar handlers
    - Create `src/routes/user.routes.ts` mapping GET /me, PATCH /me/username, PATCH /me/avatar
    - Implement username uniqueness check on update
    - Configure Multer for profile picture uploads (max 2MB, image types only)
    - Wire routes into app.ts under /api/users prefix
    - _Requirements: 4.1, 4.2, 4.3_

  - [ ]* 4.2 Write unit tests for user profile
    - Test username uniqueness validation on update
    - Test profile picture upload size limit
    - _Requirements: 4.2, 4.3_

- [x] 5. Implement trivia management and gameplay backend
  - [x] 5.1 Implement trivia service
    - Create `src/services/trivia.service.ts` with listTrivias (with category/difficulty filters), getTriviaById, getQuestions functions
    - Implement question randomization when returning questions for play
    - _Requirements: 5.1, 5.2, 5.3, 6.1_

  - [x] 5.2 Implement scoring service
    - Create `src/services/scoring.service.ts` with calculatePoints function
    - Points logic: ≤2s → 100pts, ≤4s → 75pts, ≤6s → 50pts, 7s → 0pts, incorrect → 0pts
    - Implement calculateTotalScore to sum all 10 question points
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6_

  - [x] 5.3 Implement attempt submission with best score tracking
    - Create `src/services/attempt.service.ts` (or extend trivia.service.ts) to handle attempt submission
    - Save Attempt record with answers, calculate score per answer, determine isCorrect per answer
    - Compare attempt score with existing BestScore; update if new score is higher
    - Return results with explanations for incorrect/timed-out questions
    - _Requirements: 6.6, 7.6, 8.1, 8.2, 8.3, 11.1, 11.2_

  - [x] 5.4 Create trivia and attempt routes/controllers
    - Create `src/controllers/trivia.controller.ts` with list, getById, getQuestions handlers
    - Create `src/controllers/attempt.controller.ts` with submitAttempt handler
    - Create `src/routes/trivia.routes.ts` mapping GET /trivias, GET /trivias/:id, GET /trivias/:id/questions
    - Create `src/routes/attempt.routes.ts` mapping POST /trivias/:id/attempts
    - Wire routes into app.ts under /api prefix
    - _Requirements: 5.1, 6.1, 6.6, 8.1_

  - [ ]* 5.5 Write unit tests for scoring and attempt logic
    - Test all scoring brackets (1-2s, 3-4s, 5-6s, 7s, incorrect)
    - Test best score update logic (higher replaces, equal/lower retained)
    - Test total score calculation across 10 questions
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 8.1, 8.2_

- [x] 6. Implement streaks, leaderboards, and admin upload
  - [x] 6.1 Implement streak service
    - Create `src/services/streak.service.ts` with updateStreak function
    - Logic: if already played today → no update; if played yesterday → increment; else → reset to 1
    - Update user's lastPlayedDate and currentStreak fields
    - Call updateStreak after each attempt submission
    - _Requirements: 10.1, 10.2_

  - [x] 6.2 Implement leaderboard service
    - Create `src/services/leaderboard.service.ts` with getGlobalLeaderboard, getCategoryLeaderboard functions
    - Global: top 10 users by sum of all BestScores
    - Category: top 10 users by sum of BestScores in trivias matching that category
    - Include user info (username, profilePicture) in results
    - _Requirements: 9.1, 9.2, 9.3_

  - [x] 6.3 Create leaderboard and streak routes
    - Create `src/controllers/leaderboard.controller.ts` with global, byCategory handlers
    - Create `src/routes/leaderboard.routes.ts` mapping GET /leaderboard/global, GET /leaderboard/category/:name
    - Create `src/routes/streak.routes.ts` mapping GET /streaks/me
    - Wire routes into app.ts
    - _Requirements: 9.1, 9.2, 10.1_

  - [x] 6.4 Implement admin trivia upload
    - Create `src/controllers/admin.controller.ts` with uploadTrivia, deleteTrivia handlers
    - Create `src/routes/admin.routes.ts` mapping POST /admin/trivias, DELETE /admin/trivias/:id
    - Validate JSON: required fields (title, category, difficulty, questions), exactly 10 questions, correctIndex 0-3
    - Set type to OFFICIAL and createdBy to admin userId
    - Wire routes with admin middleware
    - _Requirements: 12.1, 12.2, 12.3, 13.1, 13.2, 13.3_

  - [ ]* 6.5 Write unit tests for streak, leaderboard, and admin upload
    - Test streak increment, reset, and same-day no-op scenarios
    - Test admin upload validation (missing fields, wrong question count, invalid correctIndex)
    - Test leaderboard ranking calculation
    - _Requirements: 10.1, 10.2, 12.1, 12.2, 12.3, 9.1, 9.2_

- [x] 7. Implement error handling middleware
  - [x] 7.1 Create global error handler
    - Create `src/middlewares/error.middleware.ts` with centralized error handling
    - Handle Zod validation errors, Prisma errors, JWT errors, and custom app errors
    - Return consistent JSON error responses with appropriate HTTP status codes
    - _Requirements: 1.2, 1.3, 2.3, 3.2, 12.2, 12.3_

- [x] 8. Checkpoint - Full backend verified
  - Ensure all tests pass, ask the user if questions arise.

- [x] 9. Set up frontend project structure
  - [x] 9.1 Initialize frontend with Vite, React, and TypeScript
    - Create `frontend/` directory with Vite React-TS template
    - Install dependencies: react-router-dom, axios, react-hook-form, tailwindcss, postcss, autoprefixer
    - Configure Tailwind CSS with `tailwind.config.js` and global styles
    - Configure Vite proxy for backend API in `vite.config.ts`
    - _Requirements: 5.1, 6.1_

  - [x] 9.2 Create TypeScript types and API service layer
    - Create `src/types/user.ts` with User, LoginResponse, RegisterRequest interfaces
    - Create `src/types/trivia.ts` with Trivia, Question, Attempt, AttemptResult interfaces
    - Create `src/types/leaderboard.ts` with LeaderboardEntry interface
    - Create `src/services/api.ts` with Axios instance, interceptors for JWT token, and refresh logic
    - Create `src/services/auth.service.ts`, `trivia.service.ts`, `leaderboard.service.ts` wrapping API calls
    - _Requirements: 3.1, 5.1, 9.1_

  - [x] 9.3 Implement auth context and protected routes
    - Create `src/context/AuthContext.tsx` with user state, login, logout, register functions
    - Store tokens in localStorage, auto-refresh on app load
    - Create `src/components/ProtectedRoute.tsx` to redirect unauthenticated users to /login
    - _Requirements: 3.1, 3.3_

- [x] 10. Implement frontend authentication pages
  - [x] 10.1 Implement Registration page
    - Create `src/pages/RegisterPage.tsx` with form fields: email, phone, username, birthday, password
    - Use React Hook Form for validation (password: min 8 chars, symbol, uppercase, number)
    - On success, navigate to /verify with email in state
    - Display server-side errors (duplicate email/username)
    - _Requirements: 1.1, 1.2, 1.3_

  - [x] 10.2 Implement Email Verification page
    - Create `src/pages/VerifyEmailPage.tsx` with 6-digit code input
    - On success, navigate to /login with success message
    - Display error for invalid/expired codes
    - _Requirements: 2.1, 2.2, 2.3_

  - [x] 10.3 Implement Login page
    - Create `src/pages/LoginPage.tsx` with email and password form
    - On success, store tokens and navigate to /
    - Display errors for invalid credentials or unverified email
    - _Requirements: 3.1, 3.2, 3.3_

- [x] 11. Implement frontend trivia catalog and gameplay
  - [x] 11.1 Implement Home page with trivia catalog
    - Create `src/pages/HomePage.tsx` displaying trivia list with category and difficulty filters
    - Create `src/components/TriviaCard.tsx` showing title, category, difficulty badge
    - Implement filter dropdowns for category and difficulty
    - _Requirements: 5.1, 5.2, 5.3_

  - [x] 11.2 Implement Trivia Detail page
    - Create `src/pages/TriviaDetailPage.tsx` showing trivia info and "Play" button
    - Show user's best score for this trivia if exists
    - Allow immediate retries
    - _Requirements: 5.1, 8.3_

  - [x] 11.3 Implement Play page with timer and question flow
    - Create `src/pages/PlayPage.tsx` managing question state, timer, and answer submission
    - Create `src/hooks/useTimer.ts` with 7-second countdown logic
    - Create `src/components/Timer.tsx` displaying countdown visually
    - Create `src/components/QuestionCard.tsx` displaying question text
    - Create `src/components/OptionButton.tsx` with correct/incorrect color feedback
    - Present 10 questions one at a time in random order
    - On timer expiry: mark unanswered, show correct answer in green
    - On incorrect answer: show selected in red, correct in green
    - On correct answer: show selected in green
    - Track responseTime per question
    - After all 10 questions, submit attempt to backend
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 7.1, 7.2, 7.3, 7.4, 7.5_

  - [x] 11.4 Implement Results page
    - Create `src/pages/ResultsPage.tsx` showing score summary and per-question breakdown
    - Display total score, correct count, whether it's a new best score
    - Show explanations for incorrectly answered questions
    - Include "Retry" and "Back to catalog" buttons
    - _Requirements: 6.6, 8.1, 11.1, 11.2_

- [x] 12. Implement frontend profile, streaks, and leaderboard
  - [x] 12.1 Implement Profile page
    - Create `src/pages/ProfilePage.tsx` with username edit, avatar upload
    - Create `src/components/StreakBadge.tsx` with flame icon that grows with streak count
    - Display current streak prominently
    - _Requirements: 4.1, 4.2, 4.3, 10.3_

  - [x] 12.2 Implement Leaderboard page
    - Create `src/pages/LeaderboardPage.tsx` with Global and Category tabs
    - Create `src/components/LeaderboardTable.tsx` showing rank, username, avatar, score
    - Create `src/hooks/useLeaderboard.ts` for fetching leaderboard data
    - _Requirements: 9.1, 9.2, 9.3_

- [x] 13. Wire frontend routing and navigation
  - [x] 13.1 Set up React Router and App layout
    - Create `src/App.tsx` with all route definitions and layout wrapper
    - Implement navigation bar with links to Home, Leaderboard, Profile
    - Apply ProtectedRoute to authenticated pages
    - Configure route paths matching the design: /login, /register, /verify, /, /trivia/:id, /trivia/:id/play, /trivia/:id/results, /profile, /leaderboard
    - _Requirements: 3.1, 5.1, 9.1_

- [x] 14. Checkpoint - Full frontend verified
  - Ensure all tests pass, ask the user if questions arise.

- [x] 15. Integration and final wiring
  - [x] 15.1 Create Prisma seed script with sample data
    - Create `prisma/seed.ts` with sample admin user, sample trivias with 10 questions each, sample user accounts
    - Configure seed command in package.json
    - _Requirements: 12.1, 5.1_

  - [x] 15.2 Add rate limiting and final security configuration
    - Install and configure express-rate-limit on auth endpoints
    - Finalize CORS configuration for frontend origin
    - Add Helmet for security headers
    - _Requirements: 1.2, 3.2_

  - [ ]* 15.3 Write integration tests for core flows
    - Test full registration → verification → login flow
    - Test play trivia → submit attempt → score calculation → best score update
    - Test streak increment and reset across days
    - Test admin upload with valid and invalid JSON
    - _Requirements: 1.1, 2.1, 3.1, 6.1, 7.6, 8.1, 10.1, 12.1_

- [x] 16. Final checkpoint - Full stack verified
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- The backend is implemented first to provide a stable API for frontend development
- Unit tests validate specific examples and edge cases
- TypeScript is used throughout both frontend and backend for type safety

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1"] },
    { "id": 1, "tasks": ["1.2", "1.3"] },
    { "id": 2, "tasks": ["2.1", "2.2", "2.3"] },
    { "id": 3, "tasks": ["2.4", "2.5"] },
    { "id": 4, "tasks": ["4.1", "5.1", "5.2"] },
    { "id": 5, "tasks": ["4.2", "5.3", "6.1", "6.2"] },
    { "id": 6, "tasks": ["5.4", "5.5", "6.3", "6.4"] },
    { "id": 7, "tasks": ["6.5", "7.1"] },
    { "id": 8, "tasks": ["9.1"] },
    { "id": 9, "tasks": ["9.2", "9.3"] },
    { "id": 10, "tasks": ["10.1", "10.2", "10.3"] },
    { "id": 11, "tasks": ["11.1", "11.2", "11.3"] },
    { "id": 12, "tasks": ["11.4", "12.1", "12.2"] },
    { "id": 13, "tasks": ["13.1"] },
    { "id": 14, "tasks": ["15.1", "15.2"] },
    { "id": 15, "tasks": ["15.3"] }
  ]
}
