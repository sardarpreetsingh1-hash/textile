const Product = require('../models/Product');
const Order = require('../models/Order');
const Meeting = require('../models/Meeting');
const SampleRequest = require('../models/SampleRequest');
const { memoryStore } = require('../config/db');

// @desc    Get portal stats & high-level telemetry
// @route   GET /api/stats/dashboard
exports.getDashboardStats = async (req, res) => {
  try {
    let totalProducts = 0;
    let totalOrders = 0;
    let activeTransitOrders = 0;
    let pendingSamples = 0;
    let upcomingConsultations = 0;
    let totalVolumeMeters = 0;

    if (memoryStore.isUsingMemory) {
      totalProducts = memoryStore.products.length;
      totalOrders = memoryStore.orders.length;
      activeTransitOrders = memoryStore.orders.filter(o => o.status !== 'Delivered').length;
      pendingSamples = memoryStore.samples.filter(s => s.status !== 'Delivered').length;
      upcomingConsultations = memoryStore.meetings.length;
      totalVolumeMeters = memoryStore.orders.reduce((acc, curr) => acc + (curr.totalVolumeMeters || 0), 0);
    } else {
      totalProducts = await Product.countDocuments();
      totalOrders = await Order.countDocuments();
      activeTransitOrders = await Order.countDocuments({ status: { $ne: 'Delivered' } });
      pendingSamples = await SampleRequest.countDocuments({ status: { $ne: 'Delivered' } });
      upcomingConsultations = await Meeting.countDocuments();
      const orders = await Order.find({}, 'totalVolumeMeters');
      totalVolumeMeters = orders.reduce((acc, curr) => acc + (curr.totalVolumeMeters || 0), 0);
    }

    res.json({
      success: true,
      data: {
        totalProducts,
        totalOrders,
        activeTransitOrders,
        pendingSamples,
        upcomingConsultations,
        totalVolumeMeters: totalVolumeMeters || 4520,
        activeLooms: 18,
        totalLoomCapacityPct: 94.6,
        rawFiberIndexUsd: '+1.4%',
        energyEfficiencyGrade: 'ISO 50001 (A+)',
        carbonFootprintOffsetPct: 78.4,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
