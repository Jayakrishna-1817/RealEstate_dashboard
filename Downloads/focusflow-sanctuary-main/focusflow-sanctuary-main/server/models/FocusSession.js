import mongoose from 'mongoose';

const focusSessionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  draftId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Draft',
    default: null
  },
  duration: {
    type: Number,
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  wordCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

export default mongoose.model('FocusSession', focusSessionSchema);
