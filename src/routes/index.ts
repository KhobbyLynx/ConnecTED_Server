import express from 'express';

import authRoutes from './auth';
import userRoutes from './users';
import studentRoutes from './students';
import classRoutes from './classes';

const router = express.Router();

// Health check
router.get('/health', (req, res) => {
  res.json({ 
    status: 'API is healthy', 
    timestamp: new Date(),
    version: '1.0.0',
  });
});

// Mount routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/students', studentRoutes);
router.use('/classes', classRoutes);

export default router;
