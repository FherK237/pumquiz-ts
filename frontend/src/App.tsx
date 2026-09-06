import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import VerifyEmailPage from './pages/VerifyEmailPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Layout } from './components/Layout';
import TriviaDetailPage from './pages/TriviaDetailPage';
import PlayPage from './pages/PlayPage';
import ResultsPage from './pages/ResultsPage';
import ProfilePage from './pages/ProfilePage';
import LeaderboardPage from './pages/LeaderboardPage';
import AddTriviaPage from './pages/AddTriviaPage';

function App() {
  return (
    <div>
          <BrowserRouter>
      <Routes>
        {/* Public routes (no navbar) */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />

        {/* Authenticated routes with navigation bar */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout>
                <HomePage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/trivia/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <TriviaDetailPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Layout>
                <ProfilePage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <ProtectedRoute>
              <Layout>
                <LeaderboardPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-trivia"
          element={
            <ProtectedRoute>
              <Layout>
                <AddTriviaPage />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Immersive gameplay routes (no navbar) */}
        <Route
          path="/trivia/:id/play"
          element={
            <ProtectedRoute>
              <PlayPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/trivia/:id/results"
          element={
            <ProtectedRoute>
              <ResultsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
    </div>

  );
}

export default App;
