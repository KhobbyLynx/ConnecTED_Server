import { Request, Response } from 'express';
import Student from '../models/Student';

/**
 * Check if admission number exists
 */
export const checkAdmissionNumber = async (req: Request, res: Response) => {
  try {
    const { admissionNumber } = req.params;
    const student = await Student.findOne({ admissionNumber });
    
    res.json({ exists: !!student, student: student || null });
  } catch (error) {
    res.status(500).json({ error: 'Failed to check admission number' });
  }
};

/**
 * Auto-generate admission number
 */
export const generateAdmissionNumber = async (req: Request, res: Response) => {
  try {
    const year = new Date().getFullYear();
    const count = await Student.countDocuments();
    const admissionNumber = `STU-${year}-${(count + 1).toString().padStart(4, '0')}`;
    
    res.json({ admissionNumber });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate admission number' });
  }
};

/**
 * Get all students
 */
export const getAllStudents = async (req: Request, res: Response) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch students' });
  }
};
