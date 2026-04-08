import express from 'express';
import {
  register,
  getCurrentUser,
  approveUser,
  rejectUser,
  updateFcmToken,
  logout,
} from '../controllers/auth.controller';
import { verifyToken, requireRole, requireApproval } from '../middleware/auth.middleware';
import { authLimiter } from '../middleware/rateLimiter';

const router = express.Router();

// Public routes (require Firebase token but not MongoDB user)
router.post('/register', authLimiter, verifyToken, register);

// Protected routes (require authenticated user)
router.get('/me', verifyToken, getCurrentUser);
router.post('/fcm-token', verifyToken, updateFcmToken);
router.post('/logout', verifyToken, logout);

// Admin-only routes
router.post('/approve/:userId', verifyToken, requireRole('admin'), approveUser);
router.delete('/reject/:userId', verifyToken, requireRole('admin'), rejectUser);

export default router;
