import { Router } from 'express';
import { uploadTriviaHandler, deleteTriviaHandler } from '../controllers/admin.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { adminMiddleware } from '../middlewares/admin.middleware';
import { validate } from '../middlewares/validation.middleware';
import { uploadTriviaSchema } from '../utils/validators';

const router = Router();

// All admin routes require auth + admin
router.use(authMiddleware, adminMiddleware);

router.post('/trivias', validate(uploadTriviaSchema), uploadTriviaHandler);
router.delete('/trivias/:id', deleteTriviaHandler);

export default router;
