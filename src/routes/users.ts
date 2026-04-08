import express from 'express';
import { getAllUsers, updateUser, deleteUser } from '../controllers/users.controller';
import { verifyToken, requireRole } from '../middleware/auth.middleware';

const router = express.Router();

// All user routes require admin role
router.get('/', verifyToken, requireRole('admin'), getAllUsers);
router.put('/:id', verifyToken, requireRole('admin'), updateUser);
router.delete('/:id', verifyToken, requireRole('admin'), deleteUser);

export default router;
