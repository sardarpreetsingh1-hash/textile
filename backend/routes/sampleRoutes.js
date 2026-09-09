const express = require('express');
const router = express.Router();
const {
  getSampleRequests,
  createSampleRequest,
  updateSampleStatus,
} = require('../controllers/sampleController');

router.route('/').get(getSampleRequests).post(createSampleRequest);
router.route('/:id/status').put(updateSampleStatus);

module.exports = router;
