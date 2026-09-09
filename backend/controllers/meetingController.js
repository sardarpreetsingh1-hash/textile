const Meeting = require('../models/Meeting');
const { memoryStore } = require('../config/db');

// @desc    Get all booked consultations
// @route   GET /api/meetings
exports.getMeetings = async (req, res) => {
  try {
    if (memoryStore.isUsingMemory) {
      return res.json({ success: true, count: memoryStore.meetings.length, data: memoryStore.meetings });
    }
    const meetings = await Meeting.find().sort({ date: 1, timeSlot: 1 });
    res.json({ success: true, count: meetings.length, data: meetings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Book / Schedule a new consultation
// @route   POST /api/meetings
exports.createMeeting = async (req, res) => {
  try {
    const { meetingType, durationMinutes, date, timeSlot, fullName, email, company, phone, additionalRequirements, skuReferences } = req.body;

    if (!date || !timeSlot || !fullName || !email || !company) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields (date, timeSlot, fullName, email, company)' });
    }

    const meetingData = {
      meetingType: meetingType || 'fabric',
      durationMinutes: durationMinutes || 30,
      date,
      timeSlot,
      fullName,
      email,
      company,
      phone: phone || '',
      additionalRequirements: additionalRequirements || '',
      skuReferences: skuReferences || [],
      status: 'Confirmed',
      meetingLink: `https://meet.texora.io/consult-${Math.random().toString(36).substring(2, 9)}`,
    };

    if (memoryStore.isUsingMemory) {
      const newMeeting = {
        ...meetingData,
        _id: `mem_meet_${Date.now()}`,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      memoryStore.meetings.unshift(newMeeting);
      return res.status(201).json({ success: true, data: newMeeting });
    }

    const meeting = await Meeting.create(meetingData);
    res.status(201).json({ success: true, data: meeting });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get available time slots for a given date
// @route   GET /api/meetings/slots/:date
exports.getAvailableSlots = async (req, res) => {
  try {
    const { date } = req.params;
    const allSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '01:30 PM', '02:30 PM', '03:30 PM', '04:30 PM'];

    let bookedSlots = [];
    if (memoryStore.isUsingMemory) {
      bookedSlots = memoryStore.meetings.filter(m => m.date === date).map(m => m.timeSlot);
    } else {
      const booked = await Meeting.find({ date, status: { $ne: 'Cancelled' } });
      bookedSlots = booked.map(b => b.timeSlot);
    }

    const availableSlots = allSlots.map(slot => ({
      slot,
      isAvailable: !bookedSlots.includes(slot),
    }));

    res.json({ success: true, date, data: availableSlots });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
