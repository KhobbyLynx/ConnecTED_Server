
import mongoose, { Document, Schema } from 'mongoose';

export interface IMessage extends Document {
  threadId: string;
  senderId: string;
  senderRole: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
  attachments?: any[];
}

const MessageSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    threadId: { type: String, required: true },
    senderId: { type: String, required: true },
    senderRole: { type: String, required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    isRead: { type: Boolean, default: false },
    attachments: [{ type: Schema.Types.Mixed }],
  },
  { timestamps: true }
);

export const Message = mongoose.model<IMessage>('Message', MessageSchema);

export interface IMessageThread extends Document {
  participants: { id: string; role: string }[];
  studentId: string;
  unreadCount: number; // This might be dynamic, but keeping as field for now
  lastMessage?: any; // populate or store snippet
}

const MessageThreadSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    participants: [
      {
        id: { type: String, required: true },
        role: { type: String, required: true },
      },
    ],
    studentId: { type: String, required: true },
    unreadCount: { type: Number, default: 0 },
    lastMessage: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

export const MessageThread = mongoose.model<IMessageThread>('MessageThread', MessageThreadSchema);
