import mongoose from "mongoose";

const timetableSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  day: {
    type: String,
    required: true,
  },
  classroomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Classroom',
    required: true,
  },
}, { timestamps: true });

export const Timetable = mongoose.model('Timetable', timetableSchema);

