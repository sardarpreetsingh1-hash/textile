const express = require('express');
const router = express.Router();
const { getMeetings, createMeeting, getAvailableSlots } = require('../controllers/meetingController');

router.route('/').get(getMeetings).post(createMeeting);
router.route('/slots/:date').get(getAvailableSlots);

module.exports = router;
