import { Router } from 'express';
import { registerHandler, verifyEmailHandler, resendCodeHandler, loginHandler, refreshHandler, logoutHandler } from '../controllers/auth.controller';
import { validate } from '../middlewares/validation.middleware';
import { registerSchema, loginSchema, verifyEmailSchema, resendCodeSchema, refreshTokenSchema } from '../utils/validators';

const router = Router();

router.post('/register', validate(registerSchema), registerHandler);
router.post('/verify-email', validate(verifyEmailSchema), verifyEmailHandler);
router.post('/resend-code', validate(resendCodeSchema), resendCodeHandler);
router.post('/login', validate(loginSchema), loginHandler);
router.post('/refresh', validate(refreshTokenSchema), refreshHandler);
router.post('/logout', logoutHandler);

export default router;
