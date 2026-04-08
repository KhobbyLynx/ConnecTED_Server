import { Request, Response } from 'express';
import User from '../models/User';
import Student from '../models/Student';
import admin from 'firebase-admin';

/**
 * Get all users with pagination and filters
 */
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, q = '', role, isApproved } = req.query;
    
    const query: any = {};
    if (role && role !== 'all') query.role = role;
    if (isApproved !== undefined) query.isApproved = isApproved === 'true';
    if (q) {
      query.$or = [
        { name: { $regex: q, $options: 'i' } },
        { email: { $regex: q, $options: 'i' } }
      ];
    }

    const users = await User.find(query)
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .sort({ createdAt: -1 });

    const total = await User.countDocuments(query);

    res.json({
      data: users,
      meta: {
        page: Number(page),
        totalPages: Math.ceil(total / Number(limit)),
        total
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

/**
 * Update user (used for approval and general updates)
 */
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Find the current user state first
    const currentUser = await User.findById(id);
    if (!currentUser) return res.status(404).json({ error: 'User not found' });

    // Handle Approval Logic specifically
    if (updateData.isApproved === true && currentUser.isApproved === false) {
      console.log(`Approving user: ${currentUser.email}`);
      
      // 1. Set Custom Claims in Firebase for extra security
      try {
        await admin.auth().setCustomUserClaims(currentUser.firebaseUid, { approved: true });
        console.log('Firebase Custom Claims updated: approved=true');
      } catch (fbError) {
        console.error('Failed to update Firebase claims:', fbError);
        // We continue anyway, as the DB is the primary source of truth
      }

      // 2. If parent and student details are changed, update the student record
      if (currentUser.role === 'parent' && updateData.studentDetails) {
        const { admissionNumber, name, dateOfBirth, classId } = updateData.studentDetails;
        const student = await Student.findOne({ parentIds: id });
        if (student) {
          student.name = name || student.name;
          student.dateOfBirth = dateOfBirth || student.dateOfBirth;
          student.classId = classId || student.classId;
          student.admissionNumber = admissionNumber || student.admissionNumber;
          await student.save();
        }
      }
    }

    const user = await User.findByIdAndUpdate(id, updateData, { new: true });
    res.json(user);
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
};

/**
 * Delete/Deactivate user
 */
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
};
