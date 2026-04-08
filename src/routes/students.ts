import express from 'express';
import { 
  checkAdmissionNumber, 
  generateAdmissionNumber, 
  getAllStudents 
} from '../controllers/students.controller';
import { verifyToken } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/', verifyToken, getAllStudents);
router.get('/check/:admissionNumber', verifyToken, checkAdmissionNumber);
router.get('/generate-id', verifyToken, generateAdmissionNumber);

export default router;
