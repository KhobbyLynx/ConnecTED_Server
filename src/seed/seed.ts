
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectDB } from '../config/db';
import User from '../models/User';
import Student from '../models/Student';
import Class from '../models/Class';
import Attendance from '../models/Attendance';
import Grade from '../models/Grade';
import Homework from '../models/Homework';
import { Message, MessageThread } from '../models/Message';
import Announcement from '../models/Announcement';
import Event from '../models/Event';
import Notification from '../models/Notification';
import TeacherUpdate from '../models/TeacherUpdate';
import AuditLog from '../models/AuditLog';

import {
  mockParents, mockTeachers, mockAdmins, mockStudents,
  mockClasses, mockAttendance, mockGrades, mockHomework,
  mockMessageThreads, mockMessages, mockAnnouncements,
  mockEvents, mockNotifications, mockTeacherUpdates, mockAuditLogs
} from './data';

dotenv.config();

const importData = async () => {
  try {
    await connectDB();
    console.log('MongoDB Connected...');

    // Clear all existing data
    await User.deleteMany({});
    await Student.deleteMany({});
    await Class.deleteMany({});
    await Attendance.deleteMany({});
    await Grade.deleteMany({});
    await Homework.deleteMany({});
    await Message.deleteMany({});
    await MessageThread.deleteMany({});
    await Announcement.deleteMany({});
    await Event.deleteMany({});
    await Notification.deleteMany({});
    await TeacherUpdate.deleteMany({});
    await AuditLog.deleteMany({});

    console.log('Data Cleared...');

    // Insert Users
    const users = [...mockParents, ...mockTeachers, ...mockAdmins];
    await User.insertMany(users);
    console.log(`Imported ${users.length} Users`);

    // Insert Students
    await Student.insertMany(mockStudents);
    console.log(`Imported ${mockStudents.length} Students`);

    // Insert Classes
    await Class.insertMany(mockClasses);
    console.log(`Imported ${mockClasses.length} Classes`);

    // Insert Attendance
    await Attendance.insertMany(mockAttendance);
    console.log(`Imported ${mockAttendance.length} Attendance Records`);

    // Insert Grades
    await Grade.insertMany(mockGrades);
    console.log(`Imported ${mockGrades.length} Grades`);

    // Insert Homework
    await Homework.insertMany(mockHomework);
    console.log(`Imported ${mockHomework.length} Homework`);

    // Insert API Messages & Threads
    await MessageThread.insertMany(mockMessageThreads);
    await Message.insertMany(mockMessages);
    console.log(`Imported Messages`);

    // Insert Announcements
    await Announcement.insertMany(mockAnnouncements);
    console.log(`Imported ${mockAnnouncements.length} Announcements`);

    // Insert Events
    await Event.insertMany(mockEvents);
    console.log(`Imported ${mockEvents.length} Events`);

    // Insert Notifications
    await Notification.insertMany(mockNotifications);
    console.log(`Imported ${mockNotifications.length} Notifications`);

    // Insert Teacher Updates
    await TeacherUpdate.insertMany(mockTeacherUpdates);
    console.log(`Imported ${mockTeacherUpdates.length} Teacher Updates`);

    // Insert Audit Logs
    await AuditLog.insertMany(mockAuditLogs);
    console.log(`Imported ${mockAuditLogs.length} Audit Logs`);

    console.log('Data Import Success!');
    process.exit();
  } catch (error) {
    console.error(`Error with data import: ${error}`);
    process.exit(1);
  }
};

importData();
