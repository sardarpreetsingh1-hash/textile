const SampleRequest = require('../models/SampleRequest');
const { memoryStore } = require('../config/db');

// @desc    Get all sample requests / RFQs
// @route   GET /api/samples
exports.getSampleRequests = async (req, res) => {
  try {
    if (memoryStore.isUsingMemory) {
      return res.json({ success: true, count: memoryStore.samples.length, data: memoryStore.samples });
    }
    const samples = await SampleRequest.find().sort({ createdAt: -1 });
    res.json({ success: true, count: samples.length, data: samples });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Submit new sample request / RFQ
// @route   POST /api/samples
exports.createSampleRequest = async (req, res) => {
  try {
    const { companyName, contactPerson, email, phone, industrySector, shippingAddress, sampleItems, projectEstimatedMeters, notes } = req.body;

    if (!companyName || !contactPerson || !email || !sampleItems || sampleItems.length === 0) {
      return res.status(400).json({ success: false, message: 'Please provide company name, contact, email, and at least one textile sample item.' });
    }

    const sampleData = {
      companyName,
      contactPerson,
      email,
      phone: phone || '',
      industrySector: industrySector || 'Architecture & Interior',
      shippingAddress: shippingAddress || {
        street: '100 Industrial Parkway',
        city: 'Metropolis',
        state: 'Tech State',
        postalCode: '90210',
        country: 'Global'
      },
      sampleItems,
      projectEstimatedMeters: projectEstimatedMeters || 200,
      notes: notes || '',
      status: 'Received',
    };

    if (memoryStore.isUsingMemory) {
      const newSample = {
        ...sampleData,
        _id: `mem_samp_${Date.now()}`,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      memoryStore.samples.unshift(newSample);
      return res.status(201).json({ success: true, data: newSample });
    }

    const sample = await SampleRequest.create(sampleData);
    res.status(201).json({ success: true, data: sample });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update sample request status
// @route   PUT /api/samples/:id/status
exports.updateSampleStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (memoryStore.isUsingMemory) {
      const sample = memoryStore.samples.find(s => s._id === id);
      if (!sample) return res.status(404).json({ success: false, message: 'Sample request not found' });
      sample.status = status;
      return res.json({ success: true, data: sample });
    }

    const sample = await SampleRequest.findByIdAndUpdate(
      id,
      { $set: { status } },
      { new: true }
    );
    if (!sample) return res.status(404).json({ success: false, message: 'Sample request not found' });
    res.json({ success: true, data: sample });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
