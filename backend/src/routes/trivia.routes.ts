import { Router } from 'express';
import { listTriviasHandler, getTriviaByIdHandler, getQuestionsHandler } from '../controllers/trivia.controller';
import { submitAttemptHandler } from '../controllers/attempt.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validation.middleware';
import { submitAttemptSchema } from '../utils/validators';

const router = Router();

// All routes require authentication
router.use(authMiddleware);

// Trivia routes
router.get('/', listTriviasHandler);
router.get('/:id', getTriviaByIdHandler);
router.get('/:id/questions', getQuestionsHandler);

// Attempt route (POST /api/trivias/:id/attempts)
router.post('/:id/attempts', validate(submitAttemptSchema), submitAttemptHandler);

export default router;
