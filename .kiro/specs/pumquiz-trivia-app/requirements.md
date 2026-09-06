# Requirements Document

## Introduction

PumQuiz! is a trivia web application oriented toward learning and competition. Users register, play timed multiple-choice trivias across various categories, earn points based on response speed, maintain daily streaks, and compete on leaderboards. Administrators load trivia content via JSON uploads. The application uses a React frontend with a Node.js/Express backend and PostgreSQL database.

## Glossary

- **System**: The PumQuiz! web application as a whole (frontend and backend combined)
- **Auth_Service**: The backend service responsible for user registration, login, email verification, and session management
- **Trivia_Engine**: The backend service that manages trivia sessions, question delivery, answer validation, and scoring
- **Leaderboard_Service**: The backend service that calculates and serves ranking data
- **Streak_Tracker**: The backend service that tracks daily trivia completion and maintains streak counts
- **Admin_Panel**: The administrative interface for uploading and managing trivia content
- **User**: A registered person interacting with the application
- **Trivia**: A set of 10 fixed questions with a title, category, and difficulty level
- **Question**: A single multiple-choice item with 4 options and one correct answer
- **Attempt**: A single complete playthrough of a trivia by a user
- **Best_Score**: The highest score a user has achieved on a specific trivia
- **Streak**: The count of consecutive days a user has completed at least one trivia
- **Category**: A topic classification for trivias (e.g., cultura general, videojuegos, historia, programación, Mundial 2026)
- **Difficulty**: A classification of trivia complexity: easy, medium, or hard

## Requirements

### Requirement 1: User Registration

**User Story:** As a visitor, I want to register an account with my personal information, so that I can access trivia games and track my progress.

#### Acceptance Criteria

1. WHEN a visitor submits a registration form with email, phone number, username, and birthday, THE Auth_Service SHALL create a new user account and send a verification email to the provided email address
2. WHEN a visitor submits a password shorter than 8 characters or missing at least one symbol, one uppercase letter, or one number, THE Auth_Service SHALL reject the registration and return a descriptive validation error
3. WHEN a visitor submits an email or username that already exists in the database, THE Auth_Service SHALL reject the registration and indicate that the email or username is already taken
4. THE Auth_Service SHALL send verification emails using Nodemailer with a configurable email provider

### Requirement 2: Email Verification

**User Story:** As a registered user, I want to verify my email address, so that my account is activated and I can log in.

#### Acceptance Criteria

1. WHEN the Auth_Service creates a new user account, THE Auth_Service SHALL generate a verification code and send it to the user's email address
2. WHEN a user submits a valid verification code, THE Auth_Service SHALL mark the user's email as verified and activate the account
3. WHEN a user submits an invalid or expired verification code, THE Auth_Service SHALL reject the verification and return an error message

### Requirement 3: User Login

**User Story:** As a registered user, I want to log in with my email and password, so that I can access my account and play trivias.

#### Acceptance Criteria

1. WHEN a user submits valid email and password credentials for a verified account, THE Auth_Service SHALL authenticate the user and return a session token
2. WHEN a user submits invalid credentials, THE Auth_Service SHALL reject the login and return an authentication error
3. WHEN a user attempts to log in with an unverified email, THE Auth_Service SHALL reject the login and indicate that email verification is required

### Requirement 4: User Profile Management

**User Story:** As a logged-in user, I want to update my profile picture and username, so that I can personalize my account.

#### Acceptance Criteria

1. WHEN a logged-in user submits a new profile picture, THE System SHALL update the user's profile picture and confirm the change
2. WHEN a logged-in user submits a new username, THE System SHALL validate uniqueness, update the username, and confirm the change
3. WHEN a logged-in user submits a username that is already taken, THE System SHALL reject the update and indicate that the username is unavailable

### Requirement 5: Trivia Listing and Selection

**User Story:** As a user, I want to browse available trivias by category and difficulty, so that I can choose a trivia to play.

#### Acceptance Criteria

1. WHEN a user requests the trivia catalog, THE System SHALL return a list of available trivias with their title, category, and difficulty
2. WHEN a user filters trivias by category, THE System SHALL return only trivias matching the selected category
3. WHEN a user filters trivias by difficulty, THE System SHALL return only trivias matching the selected difficulty level

### Requirement 6: Trivia Gameplay

**User Story:** As a user, I want to play a trivia with timed questions displayed one at a time in random order, so that I can test my knowledge under time pressure.

#### Acceptance Criteria

1. WHEN a user starts a trivia, THE Trivia_Engine SHALL present the 10 questions in a randomized order, one question per screen
2. WHEN a question is displayed, THE Trivia_Engine SHALL start a 7-second countdown timer visible to the user
3. WHEN the 7-second timer expires without a user answer, THE Trivia_Engine SHALL mark the question as unanswered and reveal the correct answer highlighted in green
4. WHEN a user selects an incorrect answer, THE Trivia_Engine SHALL highlight the selected answer in red and the correct answer in green
5. WHEN a user selects the correct answer, THE Trivia_Engine SHALL highlight the selected answer in green
6. WHEN all 10 questions have been answered or timed out, THE Trivia_Engine SHALL display a results summary showing which questions were answered correctly and which were incorrect

### Requirement 7: Scoring System

**User Story:** As a user, I want to earn points based on how quickly I answer correctly, so that fast and accurate responses are rewarded.

#### Acceptance Criteria

1. WHEN a user answers a question correctly within 1-2 seconds, THE Trivia_Engine SHALL award 100 points for that question
2. WHEN a user answers a question correctly within 3-4 seconds, THE Trivia_Engine SHALL award 75 points for that question
3. WHEN a user answers a question correctly within 5-6 seconds, THE Trivia_Engine SHALL award 50 points for that question
4. WHEN a user answers a question correctly at 7 seconds, THE Trivia_Engine SHALL award 0 points for that question
5. WHEN a user answers a question incorrectly or does not answer, THE Trivia_Engine SHALL award 0 points for that question
6. WHEN a user completes a trivia attempt, THE Trivia_Engine SHALL calculate the total score as the sum of points from all 10 questions

### Requirement 8: Best Score Tracking

**User Story:** As a user, I want only my best score per trivia to count for rankings, so that I can practice without penalty and improve my standing.

#### Acceptance Criteria

1. WHEN a user completes a trivia attempt with a score higher than their current Best_Score for that trivia, THE Trivia_Engine SHALL update the Best_Score to the new score
2. WHEN a user completes a trivia attempt with a score equal to or lower than their current Best_Score, THE Trivia_Engine SHALL retain the existing Best_Score unchanged
3. THE System SHALL allow unlimited immediate retries on any trivia

### Requirement 9: Leaderboard Rankings

**User Story:** As a user, I want to see top rankings per category and globally, so that I can compare my performance with other players.

#### Acceptance Criteria

1. WHEN a user requests the category leaderboard, THE Leaderboard_Service SHALL return the top 10 users ranked by the sum of their Best_Scores across all trivias in that category
2. WHEN a user requests the global leaderboard, THE Leaderboard_Service SHALL return the top 10 users ranked by the sum of their Best_Scores across all categories
3. THE Leaderboard_Service SHALL maintain historical rankings without monthly resets

### Requirement 10: Daily Streaks

**User Story:** As a user, I want to maintain a daily streak by completing at least one trivia per day, so that I am motivated to play consistently.

#### Acceptance Criteria

1. WHEN a user completes at least one trivia in a calendar day, THE Streak_Tracker SHALL increment the user's streak count by one at the end of that day
2. WHEN a user does not complete any trivia in a calendar day, THE Streak_Tracker SHALL reset the user's streak count to zero
3. THE System SHALL display the user's current streak as a flame icon that grows visually with the streak count

### Requirement 11: Post-Trivia Learning

**User Story:** As a user, I want to see the correct answer with a brief explanation after I fail a question, so that I learn from my mistakes.

#### Acceptance Criteria

1. WHEN a user answers a question incorrectly or the timer expires, THE Trivia_Engine SHALL display the correct answer along with a brief explanation of why it is correct
2. WHEN all questions have been completed, THE System SHALL include the explanations for incorrectly answered questions in the results summary

### Requirement 12: Admin Trivia Upload

**User Story:** As an administrator, I want to upload trivias in JSON format, so that I can efficiently add new content to the platform.

#### Acceptance Criteria

1. WHEN an administrator submits a valid JSON file containing a trivia with title, category, difficulty, and exactly 10 questions each having a question text, 4 options, and a correctIndex, THE Admin_Panel SHALL create the trivia and confirm successful upload
2. WHEN an administrator submits a JSON file with missing required fields or fewer/more than 10 questions, THE Admin_Panel SHALL reject the upload and return a descriptive validation error
3. WHEN an administrator submits a JSON file with a correctIndex outside the range 0-3, THE Admin_Panel SHALL reject the upload and return a validation error indicating the invalid index

### Requirement 13: Future-Proof Data Model

**User Story:** As a developer, I want the data model to support future features like community trivias and question pools, so that the platform can evolve without major restructuring.

#### Acceptance Criteria

1. THE System SHALL store a type field on each trivia with values "official" or "community"
2. THE System SHALL store a createdBy field on each trivia referencing the user who created it
3. THE System SHALL default the type field to "official" for admin-uploaded trivias
