const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema(
  {
    meetingType: {
      type: String,
      required: true,
      enum: ['fabric', 'bulk', 'tour', 'custom'],
      default: 'fabric',
    },
    durationMinutes: {
      type: Number,
      required: true,
      enum: [30, 60],
      default: 30,
    },
    date: {
      type: String,
      required: true, // YYYY-MM-DD
    },
    timeSlot: {
      type: String,
      required: true, // e.g., '10:00 AM'
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      default: '',
    },
    additionalRequirements: {
      type: String,
      default: '',
    },
    skuReferences: [
      {
        type: String,
      },
    ],
    status: {
      type: String,
      enum: ['Confirmed', 'Pending Approval', 'Completed', 'Cancelled'],
      default: 'Confirmed',
    },
    meetingLink: {
      type: String,
      default: () => `https://meet.texora.io/consult-${Math.random().toString(36).substring(2, 9)}`,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Meeting', meetingSchema);
