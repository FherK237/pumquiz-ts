import { Router } from 'express';
import multer from 'multer';
import crypto from 'crypto';
import path from 'path';
import fs from 'fs';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validation.middleware';
import { updateUsernameSchema } from '../utils/validators';
import {
  getProfileHandler,
  updateUsernameHandler,
  updateAvatarHandler,
} from '../controllers/user.controller';

// ─── Multer Configuration ────────────────────────────────────────────────────

const uploadDir = 'uploads/avatars';

// Ensure upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${crypto.randomUUID()}${ext}`);
  },
});

const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter: (_req, file, cb) => {
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only image files (jpeg, png, gif, webp) are allowed'));
    }
  },
});

// ─── Routes ──────────────────────────────────────────────────────────────────

const router = Router();

// All routes require authentication
router.use(authMiddleware);

router.get('/me', getProfileHandler);
router.patch('/me/username', validate(updateUsernameSchema), updateUsernameHandler);
router.patch('/me/avatar', upload.single('avatar'), updateAvatarHandler);

export default router;
