import mongoose from 'mongoose';

const draftSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    default: 'Untitled',
    trim: true,
    maxlength: 200
  },
  content: {
    type: String,
    default: ''
  },
  wordCount: {
    type: Number,
    default: 0
  },
  isFavorite: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

draftSchema.pre('save', function(next) {
  if (this.isModified('content')) {
    this.wordCount = this.content.trim() ? this.content.trim().split(/\s+/).length : 0;
  }
  next();
});

export default mongoose.model('Draft', draftSchema);
