import { Request, Response } from 'express';
import Class from '../models/Class';

/**
 * Search classes for dropdown
 */
export const searchClasses = async (req: Request, res: Response) => {
  try {
    const { q } = req.query;
    const query = q ? { name: { $regex: q, $options: 'i' } } : {};
    
    const classes = await Class.find(query)
      .limit(5)
      .select('id name grade section');

    res.json(classes);
  } catch (error) {
    console.error('Search classes error:', error);
    res.status(500).json({ error: 'Failed to search classes' });
  }
};

/**
 * Get all classes
 */
export const getAllClasses = async (req: Request, res: Response) => {
  try {
    const classes = await Class.find();
    res.json(classes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch classes' });
  }
};
