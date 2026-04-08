import express from 'express';
import { searchClasses, getAllClasses } from '../controllers/classes.controller';
import { verifyToken } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/', verifyToken, getAllClasses);
router.get('/search', verifyToken, searchClasses);

export default router;
