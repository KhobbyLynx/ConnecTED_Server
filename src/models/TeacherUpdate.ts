
import mongoose, { Document, Schema } from 'mongoose';

export interface ITeacherUpdate extends Document {
  teacherId: string;
  classId?: string;
  studentId?: string;
  title: string;
  content: string;
  type: 'update' | 'behavior' | 'achievement';
}

const TeacherUpdateSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    teacherId: { type: String, required: true },
    classId: { type: String },
    studentId: { type: String },
    title: { type: String, required: true },
    content: { type: String, required: true },
    type: {
      type: String,
      enum: ['update', 'behavior', 'achievement'],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<ITeacherUpdate>('TeacherUpdate', TeacherUpdateSchema);
